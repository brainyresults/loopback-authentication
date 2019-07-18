import { DefaultCrudRepository } from '@loopback/repository';
import { DefaultDataSource } from '../datasources';
import { inject } from '@loopback/core';

import { DAO } from "../dao/main.dao";
import { AdminDAO } from '../dao/admin.dao';
import { User, Admin, AdminRelations } from '../models';
import { AdminModel } from '../models/mongodb';
import { UserRepository } from '../repositories';

export class AdminRepository extends DefaultCrudRepository<
  Admin,
  typeof Admin.prototype.id,
  AdminRelations
  > {

  userRepository: UserRepository;

  constructor(
    @inject('datasources.default') dataSource: DefaultDataSource,
  ) {
    super(Admin, dataSource);
    this.userRepository = new UserRepository(this.dataSource);
  }

  async getAdmin(
    id: typeof User.prototype.id,
  ): Promise<AdminModel | void> {
    if (!await this.userRepository.exists(id)) {
      throw new Error('User not found...');
    }
    // cria a conexão
    let conn = await DAO.connect(this.dataSource);
    if (!conn)
      DAO.invalidEscape(conn, true);

    let filter = { userId: id };
    let admins = await AdminDAO.findAdminsByFilter(conn, filter);

    if (admins.length == 0) {
      DAO.invalidEscape(conn);
      return;
    }

    await DAO.disconnect(conn);
    return admins[0];
  }
}
