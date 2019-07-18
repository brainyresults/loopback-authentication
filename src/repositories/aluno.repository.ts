import { DefaultCrudRepository } from '@loopback/repository';
import { Aluno, AlunoRelations, Treino } from '../models';
import { DefaultDataSource } from '../datasources';
import { inject } from '@loopback/core';

import { DAO } from "../dao/main.dao";
import { AlunoDAO } from '../dao/aluno.dao';
import { AlunoModel, TreinoModel } from '../models/mongodb';
import { UserRepository } from '../repositories';

export class AlunoRepository extends DefaultCrudRepository<
  Aluno,
  typeof Aluno.prototype.id,
  AlunoRelations
  > {

  userRepository: UserRepository;

  constructor(
    @inject('datasources.default') dataSource: DefaultDataSource,
  ) {
    super(Aluno, dataSource);
    this.userRepository = new UserRepository(this.dataSource);
  }

  async createTreino(userId: string, treino: TreinoModel) {
    if (!await this.userRepository.exists(userId)) {
      throw new Error('User not found...');
    }
    // cria a conexão
    let conn = await DAO.connect(this.dataSource);
    if (!conn)
      DAO.invalidEscape(conn, true);

    let filter = { userId: userId };
    let _personals: any = await AlunoDAO.findAlunosByFilter(conn, filter);
    if (_personals.length == 0) {
      throw new Error('Personal not found...');
    }
    let _treinos = _personals[0].treinos;
    _treinos.push(treino);

    let filterTreino = { "treinos": _treinos };
    let _res = await AlunoDAO.updateAlunoParts(conn, userId, filterTreino);

    // console.log('createTreino', userId, treino, filter);

    await DAO.disconnect(conn);
    return _res;
  }

}
