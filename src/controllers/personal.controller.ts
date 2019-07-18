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

import { User, Personal } from '../models';
import { PersonalRepository } from '../repositories';
import { PersonalModel, MarcacaoAulaModel } from '../models/mongodb';

export class PersonalController {
  constructor(
    @repository(PersonalRepository) public personalRepository: PersonalRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE) public userService: UserService<User, Credentials>,
  ) { }

  @post('/personals', {
    responses: {
      '200': {
        description: 'Personal model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Personal } } },
      },
    },
  })
  @authenticate('jwt')
  async create(@requestBody() personal: Personal): Promise<Personal> {
    return await this.personalRepository.create(personal);
  }

  @get('/personals/count', {
    responses: {
      '200': {
        description: 'Personal model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(Personal)) where?: Where<Personal>,
  ): Promise<Count> {
    return await this.personalRepository.count(where);
  }

  @get('/personals', {
    responses: {
      '200': {
        description: 'Array of Personal model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Personal } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(Personal)) filter?: Filter<Personal>,
  ): Promise<Personal[]> {
    return await this.personalRepository.find(filter);
  }

  @patch('/personals', {
    responses: {
      '200': {
        description: 'Personal PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody() personal: Personal,
    @param.query.object('where', getWhereSchemaFor(Personal)) where?: Where<Personal>,
  ): Promise<Count> {
    return await this.personalRepository.updateAll(personal, where);
  }

  @get('/personals/{id}', {
    responses: {
      '200': {
        description: 'Personal model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Personal } } },
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('id') id: string): Promise<Personal> {
    return await this.personalRepository.findById(id);
  }

  @patch('/personals/{id}', {
    responses: {
      '204': {
        description: 'Personal PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() personal: Personal,
  ): Promise<void> {
    await this.personalRepository.updateById(id, personal);
  }

  @put('/personals/{id}', {
    responses: {
      '204': {
        description: 'Personal PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() personal: Personal,
  ): Promise<void> {
    await this.personalRepository.replaceById(id, personal);
  }

  @del('/personals/{id}', {
    responses: {
      '204': {
        description: 'Personal DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personalRepository.deleteById(id);
  }

  @get('/personals/{userId}/info', {
    responses: {
      '200': {
        description: 'Personal model instance',
        content: { 'application/json': { schema: { 'x-ts-type': PersonalModel } } },
      },
    },
  })
  @authenticate('jwt')
  async getPersonal(@param.path.string('userId') userId: string): Promise<PersonalModel | void> {
    return await this.personalRepository.getPersonal(userId);
  }

  @get('/personals/{userId}/find', {
    responses: {
      '200': {
        description: 'find a Personal for the Aluno',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': PersonalModel } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findPersonal(
    @param.path.string('userId') userId: string
  ): Promise<PersonalModel[]> {
    return await this.personalRepository.findPersonal(userId);
  }

  @post('/personals/{id}/marcar-aula', {
    responses: {
      '200': {
        description: 'Aluno marca a aula com o Personal',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async marcarAula(
    @param.path.string('id') id: string,
    @requestBody() marcacao: MarcacaoAulaModel
  ): Promise<PersonalModel[]> {
    return await this.personalRepository.marcarAula(id, marcacao);
  }

}
