import { DefaultCrudRepository } from '@loopback/repository';
import { User, UserRelations } from '../models';
import { DefaultDataSource } from '../datasources';
import { inject } from '@loopback/core';

import { UserModel, AlunoModel, PersonalModel } from '../models/mongodb';
import { DAO } from "../dao/main.dao";
import { UserDAO } from '../dao/user.dao';
import { AlunoDAO } from '../dao/aluno.dao';
import { PersonalDAO } from '../dao/personal.dao';
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

  async getAluno(
    id: typeof User.prototype.id,
  ): Promise<AlunoModel[] | void> {
    if (!await this.exists(id)) {
      throw new Error('User not found...');
    }
    // cria a conexão
    let conn = await DAO.connect(this.dataSource);
    if (!conn)
      DAO.invalidEscape(conn, true);

    let filter = { userId: id };
    let alunos = await AlunoDAO.findAlunosByFilter(conn, filter);

    if (alunos.length == 0) {
      DAO.invalidEscape(conn);
      return [];
    }

    await DAO.disconnect(conn);
    return alunos;
  }

  async getPersonal(
    id: typeof User.prototype.id,
  ): Promise<PersonalModel[] | void> {
    if (!await this.exists(id)) {
      throw new Error('User not found...');
    }
    // cria a conexão
    let conn = await DAO.connect(this.dataSource);
    if (!conn)
      DAO.invalidEscape(conn, true);

    let filter = { userId: id };
    let personals = await PersonalDAO.findPersonalsByFilter(conn, filter);

    if (personals.length == 0) {
      DAO.invalidEscape(conn);
      return [];
    }

    await DAO.disconnect(conn);
    return personals;
  }

}
