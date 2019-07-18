import { validateCredentials } from '../services/validator';
import { inject } from '@loopback/core';
import {
  authenticate,
  UserProfile,
  AuthenticationBindings,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {
  CredentialsRequestBody,
  UserProfileSchema,
} from './specs/user-controller.specs';
import { Credentials } from '../models/bindings/auth.bind';
import { PasswordHasher } from '../services/hash.password.bcryptjs';

import {
  TokenServiceBindings,
  PasswordHasherBindings,
  UserServiceBindings,
} from '../keys';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
  HttpErrors
} from '@loopback/rest';
import * as _ from 'lodash';

import { User, Client } from '../models';
import { ClientRepository } from '../repositories';

export class ClientController {
  constructor(
    @repository(ClientRepository) public clientRepository: ClientRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE) public userService: UserService<User, Credentials>,
  ) { }

  @post('/clients', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Client } } },
      },
    },
  })
  @authenticate('jwt')
  async create(@requestBody() client: Client): Promise<Client> {
    return await this.clientRepository.create(client);
  }

  @get('/clients/count', {
    responses: {
      '200': {
        description: 'Client model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return await this.clientRepository.count(where);
  }

  @get('/clients', {
    responses: {
      '200': {
        description: 'Array of Client model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Client } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(Client)) filter?: Filter<Client>,
  ): Promise<Client[]> {
    return await this.clientRepository.find(filter);
  }

  @patch('/clients', {
    responses: {
      '200': {
        description: 'Client PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody() client: Client,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return await this.clientRepository.updateAll(client, where);
  }

  @get('/clients/{id}', {
    responses: {
      '200': {
        description: 'Client model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Client } } },
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('id') id: string): Promise<Client> {
    return await this.clientRepository.findById(id);
  }

  @patch('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() client: Client,
  ): Promise<void> {
    await this.clientRepository.updateById(id, client);
  }

  @put('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() client: Client,
  ): Promise<void> {
    await this.clientRepository.replaceById(id, client);
  }

  @del('/clients/{id}', {
    responses: {
      '204': {
        description: 'Client DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clientRepository.deleteById(id);
  }

}
