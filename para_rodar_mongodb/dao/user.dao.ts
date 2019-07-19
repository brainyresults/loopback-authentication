import { Connection } from "typeorm";
import { UserModel } from '../models/mongodb/User';

export let UserDAO = {

  findUser: async function (connection: Connection, id: any): Promise<UserModel | undefined> {
    const res = await connection.manager.findOne(UserModel, id);
    console.log(id, res);
    return res;
  },

  findUsers: async function (connection: Connection): Promise<UserModel[]> {
    const res = await connection.manager.find(UserModel);
    return res;
  },

  findUsersByFilter: async function (connection: Connection, filter: any): Promise<UserModel[]> {
    const res = await connection.manager.find(UserModel, filter);
    return res;
  },

  saveUser: async function (connection: Connection, model: UserModel | undefined): Promise<UserModel | undefined> {
    const res = model ? await connection.manager.save(model) : undefined;
    return res;
  },

}
