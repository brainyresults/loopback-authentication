// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

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

import { User, Client, ClientRelations } from '../models';
import { UserRepository } from '../repositories';
import { ClientRepository } from '../repositories';
import { ClientModel, UserModel } from '../models/mongodb';
import { UserProfileExtended } from "../models/bindings/auth.bind"
import { UserServiceConstants } from "../keys";

export class UserController {
  public user: UserProfileExtended;

  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(ClientRepository) public clientRepository: ClientRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE) public userService: UserService<User, Credentials>,
  ) { }

  @post('/users')
  async create(
    @param.query.string('key') key: string,
    @requestBody() user: User
  ): Promise<User> {
    // ensure a valid email value and password value
    validateCredentials(_.pick(user, ['email', 'password']));

    if (key === UserServiceConstants.ADDUSER_SECRET_VALUE) {
      // encrypt the password
      // eslint-disable-next-line require-atomic-updates
      user.password = await this.passwordHasher.hashPassword(user.password || "");

      try {
        // create the new user
        const savedUser = await this.userRepository.create(user);
        delete savedUser.password;

        return savedUser;
      } catch (error) {
        // MongoError 11000 duplicate key
        if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
          throw new HttpErrors.Conflict('Email value is already taken');
        } else {
          throw error;
        }
      }
    } else {
      throw new HttpErrors.Conflict('Invalid KEY');
    }
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return await this.userRepository.count(where);
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(AuthenticationBindings.CURRENT_USER) currentUserProfile: UserProfile,
  ): Promise<UserProfile> {
    return currentUserProfile;
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': User } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(User)) filter?: Filter<User>,
  ): Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'User PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody() user: User,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return await this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: { 'application/json': { schema: { 'x-ts-type': User } } },
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('id') id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{ id: string, token: string }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // salva o user_role nos dados do User
    let user_profile: UserProfileExtended = this.userService.convertToUserProfile(user);
    user_profile.user_role = user.user_role;
    this.user = user_profile;

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {
      id: user.id || "",
      token
    };
  }

  @get('/users/{id}/client', {
    responses: {
      '200': {
        description: 'get Client',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Client } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async getClient(
    @param.path.string('id') id: string
  ): Promise<(Client & ClientRelations) | any> {
    let _ret: any = {};

    let clients = await this.userRepository.getClient(id);
    // console.log('clients', clients);

    if (clients && clients.length > 0) {
      // traz somente os ids
      let client: ClientModel = clients[0];

      // recupera os dados
      let _id = "" + client.id;
      let _client = await this.clientRepository.findById(_id);
      // console.log('client', client, _client);
      return _client;
    }

    return _ret;
  }

}
