import { DefaultCrudRepository } from '@loopback/repository';
import { Client, ClientRelations } from '../models';
import { JsonDataSource } from '../datasources';
import { inject } from '@loopback/core';

// import { DAO } from "../dao/main.dao";
import { UserRepository } from '../repositories';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
  > {

  userRepository: UserRepository;

  constructor(
    @inject('datasources.JSON') dataSource: JsonDataSource,
  ) {
    super(Client, dataSource);
    this.userRepository = new UserRepository(this.dataSource);
  }
}
