import { Connection } from "typeorm";
import { ClientModel } from '../models/mongodb/Client';

const modelName = 'Client';

export let ClientDAO = {

  findClient: async function (connection: Connection, id: any): Promise<ClientModel | undefined> {
    const res = await connection.manager.findOne(ClientModel, id);
    console.log(id, res);
    return res;
  },

  findClients: async function (connection: Connection): Promise<ClientModel[]> {
    const res = await connection.manager.find(ClientModel);
    return res;
  },

  findClientsByFilter: async function (connection: Connection, filter: any): Promise<ClientModel[]> {
    const res = await connection.manager.find(ClientModel, filter);
    return res;
  },

  saveClient: async function (connection: Connection, model: ClientModel | undefined): Promise<ClientModel | undefined> {
    const res = model ? await connection.manager.save(model) : undefined;
    return res;
  },

  aggregateClient: async function (connection: Connection, id: string, filters: any[]): Promise<any[]> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .aggregate(filters, { cursor: { batchSize: 1 } })
      .toArray();
    return _res;
  },

  updateClientParts: async function (connection: Connection, id: string, filter: any): Promise<any> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .updateOne({ userId: id }, { $set: filter });
    return _res;
  },

  updateClientPartsByFilter: async function (connection: Connection, id: string, filter: any, data: any): Promise<any> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .updateOne(filter, { $set: data });
    return _res;
  },

}
