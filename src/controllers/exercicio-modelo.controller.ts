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

import { User, ExercicioModelo } from '../models';
import { ExercicioModeloRepository } from '../repositories';

export class ExercicioModeloController {
  constructor(
    @repository(ExercicioModeloRepository) public exercicioModeloRepository: ExercicioModeloRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE) public userService: UserService<User, Credentials>,
  ) { }

  @post('/exercicios-modelo', {
    responses: {
      '200': {
        description: 'ExercicioModelo model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ExercicioModelo } } },
      },
    },
  })
  @authenticate('jwt')
  async create(@requestBody() exercicioModelo: ExercicioModelo): Promise<ExercicioModelo> {
    return await this.exercicioModeloRepository.create(exercicioModelo);
  }

  @get('/exercicios-modelo/count', {
    responses: {
      '200': {
        description: 'ExercicioModelo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(ExercicioModelo)) where?: Where<ExercicioModelo>,
  ): Promise<Count> {
    return await this.exercicioModeloRepository.count(where);
  }

  @get('/exercicios-modelo', {
    responses: {
      '200': {
        description: 'Array of ExercicioModelo model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': ExercicioModelo } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(ExercicioModelo)) filter?: Filter<ExercicioModelo>,
  ): Promise<ExercicioModelo[]> {
    return await this.exercicioModeloRepository.find(filter);
  }

  @patch('/exercicios-modelo', {
    responses: {
      '200': {
        description: 'ExercicioModelo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody() exercicioModelo: ExercicioModelo,
    @param.query.object('where', getWhereSchemaFor(ExercicioModelo)) where?: Where<ExercicioModelo>,
  ): Promise<Count> {
    return await this.exercicioModeloRepository.updateAll(exercicioModelo, where);
  }

  @get('/exercicios-modelo/{id}', {
    responses: {
      '200': {
        description: 'ExercicioModelo model instance',
        content: { 'application/json': { schema: { 'x-ts-type': ExercicioModelo } } },
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('id') id: string): Promise<ExercicioModelo> {
    return await this.exercicioModeloRepository.findById(id);
  }

  @patch('/exercicios-modelo/{id}', {
    responses: {
      '204': {
        description: 'ExercicioModelo PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() exercicioModelo: ExercicioModelo,
  ): Promise<void> {
    await this.exercicioModeloRepository.updateById(id, exercicioModelo);
  }

  @put('/exercicios-modelo/{id}', {
    responses: {
      '204': {
        description: 'ExercicioModelo PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() exercicioModelo: ExercicioModelo,
  ): Promise<void> {
    await this.exercicioModeloRepository.replaceById(id, exercicioModelo);
  }

  @del('/exercicios-modelo/{id}', {
    responses: {
      '204': {
        description: 'ExercicioModelo DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.exercicioModeloRepository.deleteById(id);
  }
}
