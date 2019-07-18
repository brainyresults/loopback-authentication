import { Connection } from "typeorm";
import { AdminModel } from "../models/mongodb/Admin";

const modelName = 'Admin';

export let AdminDAO = {

  findAdmin: async function (connection: Connection, id: any): Promise<AdminModel | undefined> {
    const res = await connection.manager.findOne(AdminModel, id);
    console.log(id, res);
    return res;
  },

  findAdmins: async function (connection: Connection): Promise<AdminModel[]> {
    const res = await connection.manager.find(AdminModel);
    return res;
  },

  findAdminsByFilter: async function (connection: Connection, filter: any): Promise<AdminModel[]> {
    const res = await connection.manager.find(AdminModel, filter);
    return res;
  },

  saveAdmin: async function (connection: Connection, model: AdminModel | undefined): Promise<AdminModel | undefined> {
    const res = model ? await connection.manager.save(model) : undefined;
    return res;
  },

  aggregateAdmin: async function (connection: Connection, id: string, filters: any[]): Promise<any[]> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .aggregate(filters, { cursor: { batchSize: 1 } })
      .toArray();
    return _res;
  },

  updateAdminParts: async function (connection: Connection, id: string, filter: any): Promise<any> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .updateOne({ userId: id }, { $set: filter });
    return _res;
  },

  updateAdminPartsByFilter: async function (connection: Connection, id: string, filter: any, data: any): Promise<any> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .updateOne(filter, { $set: data });
    return _res;
  },

}
