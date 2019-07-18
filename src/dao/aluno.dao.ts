import { Connection } from "typeorm";
import { AlunoModel } from '../models/mongodb/Aluno';

const modelName = 'Aluno';

export let AlunoDAO = {

  findAluno: async function (connection: Connection, id: any): Promise<AlunoModel | undefined> {
    const res = await connection.manager.findOne(AlunoModel, id);
    console.log(id, res);
    return res;
  },

  findAlunos: async function (connection: Connection): Promise<AlunoModel[]> {
    const res = await connection.manager.find(AlunoModel);
    return res;
  },

  findAlunosByFilter: async function (connection: Connection, filter: any): Promise<AlunoModel[]> {
    const res = await connection.manager.find(AlunoModel, filter);
    return res;
  },

  saveAluno: async function (connection: Connection, model: AlunoModel | undefined): Promise<AlunoModel | undefined> {
    const res = model ? await connection.manager.save(model) : undefined;
    return res;
  },

  aggregateAluno: async function (connection: Connection, id: string, filters: any[]): Promise<any[]> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .aggregate(filters, { cursor: { batchSize: 1 } })
      .toArray();
    return _res;
  },

  updateAlunoParts: async function (connection: Connection, id: string, filter: any): Promise<any> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .updateOne({ userId: id }, { $set: filter });
    return _res;
  },

  updateAlunoPartsByFilter: async function (connection: Connection, id: string, filter: any, data: any): Promise<any> {
    let _res = await connection.manager.getMongoRepository(modelName)
      .updateOne(filter, { $set: data });
    return _res;
  },

}
