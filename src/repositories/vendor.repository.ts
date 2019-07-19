import { DefaultCrudRepository } from '@loopback/repository';
import { JsonDataSource } from '../datasources';
import { inject } from '@loopback/core';

// import { DAO } from "../dao/main.dao";
// import { VendorDAO } from '../dao/vendor.dao';
// import { ClientDAO } from '../dao/client.dao';
// import { VendorModel } from '../models/mongodb';
import { User, Vendor, VendorRelations } from '../models';
import { UserRepository } from '../repositories';

export class VendorRepository extends DefaultCrudRepository<
  Vendor,
  typeof Vendor.prototype.id,
  VendorRelations
  > {

  userRepository: UserRepository;

  constructor(
    @inject('datasources.JSON') dataSource: JsonDataSource,
  ) {
    super(Vendor, dataSource);
    this.userRepository = new UserRepository(this.dataSource);
  }

  /** /
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
  /**/

}
