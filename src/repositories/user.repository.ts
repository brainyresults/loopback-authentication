import { DefaultCrudRepository } from '@loopback/repository';
import { User, UserRelations } from '../models';
import { DefaultDataSource } from '../datasources';
import { inject } from '@loopback/core';

import { UserModel, ClientModel, VendorModel } from '../models/mongodb';
import { DAO } from "../dao/main.dao";
import { UserDAO } from '../dao/user.dao';
import { ClientDAO } from '../dao/client.dao';
import { VendorDAO } from '../dao/vendor.dao';
import { Credentials } from "../models/bindings/auth.bind";

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {
  constructor(
    @inject('datasources.default') dataSource: DefaultDataSource,
  ) {
    super(User, dataSource);
  }

  async getClient(
    id: typeof User.prototype.id,
  ): Promise<ClientModel[] | void> {
    if (!await this.exists(id)) {
      throw new Error('User not found...');
    }
    // cria a conexão
    let conn = await DAO.connect(this.dataSource);
    if (!conn)
      DAO.invalidEscape(conn, true);

    let filter = { userId: id };
    let clients = await ClientDAO.findClientsByFilter(conn, filter);

    if (clients.length == 0) {
      DAO.invalidEscape(conn);
      return [];
    }

    await DAO.disconnect(conn);
    return clients;
  }

  async getVendor(
    id: typeof User.prototype.id,
  ): Promise<VendorModel[] | void> {
    if (!await this.exists(id)) {
      throw new Error('User not found...');
    }
    // cria a conexão
    let conn = await DAO.connect(this.dataSource);
    if (!conn)
      DAO.invalidEscape(conn, true);

    let filter = { userId: id };
    let vendors = await VendorDAO.findVendorsByFilter(conn, filter);

    if (vendors.length == 0) {
      DAO.invalidEscape(conn);
      return [];
    }

    await DAO.disconnect(conn);
    return vendors;
  }

}
