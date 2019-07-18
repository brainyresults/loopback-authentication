import { DefaultDataSource } from '../datasources';
import { createConnection, Connection, ObjectID } from "typeorm";
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

import { UserModel } from '../models/mongodb/User';
import { ClientModel } from '../models/mongodb/Client';
import { VendorModel } from '../models/mongodb/Vendor';

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
        UserModel,
        ClientModel,
        VendorModel,
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
