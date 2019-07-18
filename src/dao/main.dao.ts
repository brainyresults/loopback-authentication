import { DefaultDataSource } from '../datasources';
import { createConnection, Connection, ObjectID } from "typeorm";
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

import { AlunoModel } from '../models/mongodb/Aluno';
import { AtividadeModel } from '../models/mongodb/Atividade';
import { AulaModel } from '../models/mongodb/Aula';
import { ExercicioModel } from '../models/mongodb/Exercicio';
import { ExercicioModeloModel } from '../models/mongodb/ExercicioModelo';
import { PersonalModel } from '../models/mongodb/Personal';
import { TreinoModel } from '../models/mongodb/Treino';
import { UserModel } from '../models/mongodb/User';

export let DAO = {
  getDataSource: async function (dataSource: DefaultDataSource) {
    // TODO: quando tem muitas conexões simultâneas, precisa mudar o nome para não colidir com a "default"
    // TODO: criar a comexão somente se já não existir
    let _name = "main_" + ("" + Math.random()).split('.')[1];

    let conn: MongoConnectionOptions = {
      type: "mongodb",
      name: _name,
      host: dataSource.settings.host,
      port: dataSource.settings.port,
      username: dataSource.settings.user,
      password: dataSource.settings.password,
      database: dataSource.settings.database,
      entities: [
        AlunoModel,
        AtividadeModel,
        AulaModel,
        ExercicioModel,
        ExercicioModeloModel,
        PersonalModel,
        TreinoModel,
        UserModel,
      ],
      useNewUrlParser: true
    }
    return conn;
  },

  connect: async function (dataSource: DefaultDataSource): Promise<Connection> {
    let conn = await DAO.getDataSource(dataSource);
    return createConnection(conn);
  },

  disconnect: async function (connection: Connection) {
    await connection.close();
    return true;
  },

  invalidEscape: async function (conn: Connection, isException: boolean = false) {
    await DAO.disconnect(conn);

    if (isException)
      throw Error('Não foi possível se conectar ao banco de dados...');
  },

  setID() {
    return new ObjectID().generate();
  },

}
