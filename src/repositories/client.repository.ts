import { DefaultCrudRepository } from '@loopback/repository';
import { Client, ClientRelations } from '../models';
import { DefaultDataSource } from '../datasources';
import { inject } from '@loopback/core';

import { DAO } from "../dao/main.dao";
import { UserRepository } from '../repositories';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
  > {

  userRepository: UserRepository;

  constructor(
    @inject('datasources.default') dataSource: DefaultDataSource,
  ) {
    super(Client, dataSource);
    this.userRepository = new UserRepository(this.dataSource);
  }
}
