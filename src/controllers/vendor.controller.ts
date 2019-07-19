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

import { User, Vendor } from '../models';
import { VendorRepository } from '../repositories';
import { VendorModel } from '../models/mongodb';

export class VendorController {
  constructor(
    @repository(VendorRepository) public vendorRepository: VendorRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER) public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE) public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE) public userService: UserService<User, Credentials>,
  ) { }

  @post('/vendors', {
    responses: {
      '200': {
        description: 'Vendor model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Vendor } } },
      },
    },
  })
  @authenticate('jwt')
  async create(@requestBody() vendor: Vendor): Promise<Vendor> {
    return await this.vendorRepository.create(vendor);
  }

  @get('/vendors/count', {
    responses: {
      '200': {
        description: 'Vendor model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async count(
    @param.query.object('where', getWhereSchemaFor(Vendor)) where?: Where<Vendor>,
  ): Promise<Count> {
    return await this.vendorRepository.count(where);
  }

  @get('/vendors', {
    responses: {
      '200': {
        description: 'Array of Vendor model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Vendor } },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @param.query.object('filter', getFilterSchemaFor(Vendor)) filter?: Filter<Vendor>,
  ): Promise<Vendor[]> {
    return await this.vendorRepository.find(filter);
  }

  @patch('/vendors', {
    responses: {
      '200': {
        description: 'Vendor PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @requestBody() vendor: Vendor,
    @param.query.object('where', getWhereSchemaFor(Vendor)) where?: Where<Vendor>,
  ): Promise<Count> {
    return await this.vendorRepository.updateAll(vendor, where);
  }

  @get('/vendors/{id}', {
    responses: {
      '200': {
        description: 'Vendor model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Vendor } } },
      },
    },
  })
  @authenticate('jwt')
  async findById(@param.path.string('id') id: string): Promise<Vendor> {
    return await this.vendorRepository.findById(id);
  }

  @patch('/vendors/{id}', {
    responses: {
      '204': {
        description: 'Vendor PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() vendor: Vendor,
  ): Promise<void> {
    await this.vendorRepository.updateById(id, vendor);
  }

  @put('/vendors/{id}', {
    responses: {
      '204': {
        description: 'Vendor PUT success',
      },
    },
  })
  @authenticate('jwt')
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vendor: Vendor,
  ): Promise<void> {
    await this.vendorRepository.replaceById(id, vendor);
  }

  @del('/vendors/{id}', {
    responses: {
      '204': {
        description: 'Vendor DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vendorRepository.deleteById(id);
  }

  /** /
  @get('/vendors/{userId}/info', {
    responses: {
      '200': {
        description: 'Vendor model instance',
        content: { 'application/json': { schema: { 'x-ts-type': VendorModel } } },
      },
    },
  })
  @authenticate('jwt')
  async getVendor(@param.path.string('userId') userId: string): Promise<VendorModel | void> {
    return await this.vendorRepository.getVendor(userId);
  }
  /**/
}
