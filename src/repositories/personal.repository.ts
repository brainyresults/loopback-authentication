import { DefaultCrudRepository } from '@loopback/repository';
import { DefaultDataSource } from '../datasources';
import { inject } from '@loopback/core';

import { DAO } from "../dao/main.dao";
import { PersonalDAO } from '../dao/personal.dao';
import { AlunoDAO } from '../dao/aluno.dao';
import { PersonalModel, AulaModel, MarcacaoAulaModel } from '../models/mongodb';
import { User, Personal, PersonalRelations, Aluno } from '../models';
import { UserRepository } from '../repositories';

export class PersonalRepository extends DefaultCrudRepository<
  Personal,
  typeof Personal.prototype.id,
  PersonalRelations
  > {

  userRepository: UserRepository;

  constructor(
    @inject('datasources.default') dataSource: DefaultDataSource,
  ) {
    super(Personal, dataSource);
    this.userRepository = new UserRepository(this.dataSource);
  }

  async getPersonal(
    id: typeof User.prototype.id,
  ): Promise<PersonalModel | void> {
    if (!await this.userRepository.exists(id)) {
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
      return;
    }

    await DAO.disconnect(conn);
    return personals[0];
  }

  async findPersonal(userId: string) {
    if (!await this.userRepository.exists(userId)) {
      throw new Error('User not found...');
    }
    // cria a conexão
    let conn = await DAO.connect(this.dataSource);
    if (!conn)
      DAO.invalidEscape(conn, true);

    let filter = { userId: userId };
    let _alunos: any = await AlunoDAO.findAlunosByFilter(conn, filter);
    let _treino = _alunos[0].treinos[0];

    // find
    let _busca = {
      $or: [
        { objetivos: { $in: _treino.objetivos } },
        { horarios: { $in: _treino.horarios } },
        { dias_treino: { $in: _treino.dias_treino } }
      ]
    }
    let _res = await PersonalDAO.findPersonalsByFilter(conn, _busca);
    let _ids = _res.map(function (el) { return el.id });

    // ordered
    let _order = await PersonalDAO.findPersonalsByFilter(conn, {});
    let _ids2 = _order.map(function (el) { return el.id });

    console.log('findPersonal', _busca, _alunos[0].id, _ids, _ids2);

    // concatenar _res + _ordered
    let _ret = _res.concat(_order.filter(function (el) {
      return _res.indexOf(el) < 0;
    }));

    await DAO.disconnect(conn);
    return _ret;
  }

  async showPersonalCard(userId: string) {
    if (!await this.userRepository.exists(userId)) {
      throw new Error('User not found...');
    }
    // cria a conexão
    let conn = await DAO.connect(this.dataSource);
    if (!conn)
      DAO.invalidEscape(conn, true);

    await DAO.disconnect(conn);
    return;
  }

  async marcarAula(id: string, marcacao: MarcacaoAulaModel): Promise<any> {
    if (!await this.userRepository.exists(id)) {
      throw new Error('Personal not found...');
    }
    // cria a conexão
    let conn = await DAO.connect(this.dataSource);
    if (!conn)
      DAO.invalidEscape(conn, true);

    let filter = { userId: id };
    let _personals: any = await PersonalDAO.findPersonalsByFilter(conn, filter);
    if (_personals.length == 0) {
      throw new Error('Personal not found...');
    }

    marcacao.data_solicitacao = new Date();

    let _marcacoes = _personals[0].marcacoes;
    _marcacoes.push(marcacao);

    let filterMarcacao = { "marcacoes": _marcacoes };
    let _res = await PersonalDAO.updatePersonalParts(conn, id, filterMarcacao);

    // console.log('marcarAula', marcacao, _marcacoes);

    await DAO.disconnect(conn);
    return _res;
  }

}
