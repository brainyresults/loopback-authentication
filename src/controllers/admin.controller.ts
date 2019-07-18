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

import { User, Admin } from '../models';
import { AdminRepository } from '../repositories';

export class AdminController {
  constructor(
    @repository(AdminRepository) public adminRepository: AdminRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE) public userService: UserService<User, Credentials>,
  ) { }

  @post('/admins', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Admin } } },
      },
    },
  })
  @authenticate('jwt')
  async create(@requestBody() admin: Admin): Promise<Admin> {
    return await this.adminRepository.create(admin);
  }

  @get('/admins/count', {
    responses: {
      '200': {
        description: 'Admin model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(Admin)) where?: Where<Admin>,
  ): Promise<Count> {
    return await this.adminRepository.count(where);
  }

  @get('/admins', {
    responses: {
      '200': {
        description: 'Array of Admin model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Admin } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(Admin)) filter?: Filter<Admin>,
  ): Promise<Admin[]> {
    return await this.adminRepository.find(filter);
  }

  @patch('/admins', {
    responses: {
      '200': {
        description: 'Admin PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody() admin: Admin,
    @param.query.object('where', getWhereSchemaFor(Admin)) where?: Where<Admin>,
  ): Promise<Count> {
    return await this.adminRepository.updateAll(admin, where);
  }

  @get('/admins/{id}', {
    responses: {
      '200': {
        description: 'Admin model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Admin } } },
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('id') id: string): Promise<Admin> {
    return await this.adminRepository.findById(id);
  }

  @patch('/admins/{id}', {
    responses: {
      '204': {
        description: 'Admin PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() admin: Admin,
  ): Promise<void> {
    await this.adminRepository.updateById(id, admin);
  }

  @put('/admins/{id}', {
    responses: {
      '204': {
        description: 'Admin PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() admin: Admin,
  ): Promise<void> {
    await this.adminRepository.replaceById(id, admin);
  }

  @del('/admins/{id}', {
    responses: {
      '204': {
        description: 'Admin DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.adminRepository.deleteById(id);
  }

}
