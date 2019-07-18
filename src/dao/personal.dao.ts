import { Connection } from "typeorm";
import { PersonalModel } from '../models/mongodb/Personal';

const modelName = 'Personal';

export let PersonalDAO = {

  findPersonal: async function (connection: Connection, id: any): Promise<PersonalModel | undefined> {
    const res = await connection.manager.findOne(PersonalModel, id);
    console.log(id, res);
    return res;
  },

  findPersonals: async function (connection: Connection): Promise<PersonalModel[]> {
    const res = await connection.manager.find(PersonalModel);
    return res;
  },

  findPersonalsByFilter: async function (connection: Connection, filter: any): Promise<PersonalModel[]> {
    const res = await connection.manager.find(PersonalModel, filter);
    return res;
  },

  savePersonal: async function (connection: Connection, model: PersonalModel | undefined): Promise<PersonalModel | undefined> {
    const res = model ? await connection.manager.save(model) : undefined;
    return res;
  },

  aggregatePersonal: async function (connection: Connection, id: string, filters: any[]): Promise<any[]> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .aggregate(filters, { cursor: { batchSize: 1 } })
      .toArray();
    return _res;
  },

  updatePersonalParts: async function (connection: Connection, id: string, filter: any): Promise<any> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .updateOne({ userId: id }, { $set: filter });
    return _res;
  },

  updatePersonalPartsByFilter: async function (connection: Connection, id: string, filter: any, data: any): Promise<any> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .updateOne(filter, { $set: data });
    return _res;
  },

}
