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

import { User, Aluno, Treino } from '../models';
import { AlunoRepository } from '../repositories';
import { TreinoModel } from '../models/mongodb';

export class AlunoController {
  constructor(
    @repository(AlunoRepository) public alunoRepository: AlunoRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE) public userService: UserService<User, Credentials>,
  ) { }

  @post('/alunos', {
    responses: {
      '200': {
        description: 'Aluno model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Aluno } } },
      },
    },
  })
  @authenticate('jwt')
  async create(@requestBody() aluno: Aluno): Promise<Aluno> {
    return await this.alunoRepository.create(aluno);
  }

  @get('/alunos/count', {
    responses: {
      '200': {
        description: 'Aluno model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(Aluno)) where?: Where<Aluno>,
  ): Promise<Count> {
    return await this.alunoRepository.count(where);
  }

  @get('/alunos', {
    responses: {
      '200': {
        description: 'Array of Aluno model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Aluno } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(Aluno)) filter?: Filter<Aluno>,
  ): Promise<Aluno[]> {
    return await this.alunoRepository.find(filter);
  }

  @patch('/alunos', {
    responses: {
      '200': {
        description: 'Aluno PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody() aluno: Aluno,
    @param.query.object('where', getWhereSchemaFor(Aluno)) where?: Where<Aluno>,
  ): Promise<Count> {
    return await this.alunoRepository.updateAll(aluno, where);
  }

  @get('/alunos/{id}', {
    responses: {
      '200': {
        description: 'Aluno model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Aluno } } },
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('id') id: string): Promise<Aluno> {
    return await this.alunoRepository.findById(id);
  }

  @patch('/alunos/{id}', {
    responses: {
      '204': {
        description: 'Aluno PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() aluno: Aluno,
  ): Promise<void> {
    await this.alunoRepository.updateById(id, aluno);
  }

  @put('/alunos/{id}', {
    responses: {
      '204': {
        description: 'Aluno PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() aluno: Aluno,
  ): Promise<void> {
    await this.alunoRepository.replaceById(id, aluno);
  }

  @del('/alunos/{id}', {
    responses: {
      '204': {
        description: 'Aluno DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.alunoRepository.deleteById(id);
  }

  @post('/alunos/{userId}/treino', {
    responses: {
      '200': {
        description: 'Aluno model instance',
        content: { 'application/json': { schema: { 'x-ts-type': TreinoModel } } },
      },
    },
  })
  @authenticate('jwt')
  async createTreino(
    @param.path.string('userId') userId: string,
    @requestBody() treino: TreinoModel
  ): Promise<TreinoModel> {
    return await this.alunoRepository.createTreino(userId, treino);
  }

}
