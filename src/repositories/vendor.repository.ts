import { DefaultCrudRepository } from '@loopback/repository';
import { DefaultDataSource } from '../datasources';
import { inject } from '@loopback/core';

import { DAO } from "../dao/main.dao";
import { VendorDAO } from '../dao/vendor.dao';
import { User, Vendor, VendorRelations } from '../models';
import { VendorModel } from '../models/mongodb';
import { UserRepository } from '../repositories';
import { ClientDAO } from '../dao/client.dao';

export class VendorRepository extends DefaultCrudRepository<
  Vendor,
  typeof Vendor.prototype.id,
  VendorRelations
  > {

  userRepository: UserRepository;

  constructor(
    @inject('datasources.default') dataSource: DefaultDataSource,
  ) {
    super(Vendor, dataSource);
    this.userRepository = new UserRepository(this.dataSource);
  }

  async getVendor(
    id: typeof User.prototype.id,
  ): Promise<VendorModel | void> {
    if (!await this.userRepository.exists(id)) {
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
      return;
    }

    await DAO.disconnect(conn);
    return vendors[0];
  }

}
