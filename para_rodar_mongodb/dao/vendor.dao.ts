import { Connection } from "typeorm";
import { VendorModel } from '../models/mongodb/Vendor';

const modelName = 'Vendor';

export let VendorDAO = {

  findVendor: async function (connection: Connection, id: any): Promise<VendorModel | undefined> {
    const res = await connection.manager.findOne(VendorModel, id);
    console.log(id, res);
    return res;
  },

  findVendors: async function (connection: Connection): Promise<VendorModel[]> {
    const res = await connection.manager.find(VendorModel);
    return res;
  },

  findVendorsByFilter: async function (connection: Connection, filter: any): Promise<VendorModel[]> {
    const res = await connection.manager.find(VendorModel, filter);
    return res;
  },

  saveVendor: async function (connection: Connection, model: VendorModel | undefined): Promise<VendorModel | undefined> {
    const res = model ? await connection.manager.save(model) : undefined;
    return res;
  },

  aggregateVendor: async function (connection: Connection, id: string, filters: any[]): Promise<any[]> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .aggregate(filters, { cursor: { batchSize: 1 } })
      .toArray();
    return _res;
  },

  updateVendorParts: async function (connection: Connection, id: string, filter: any): Promise<any> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .updateOne({ userId: id }, { $set: filter });
    return _res;
  },

  updateVendorPartsByFilter: async function (connection: Connection, id: string, filter: any, data: any): Promise<any> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .updateOne(filter, { $set: data });
    return _res;
  },

}
