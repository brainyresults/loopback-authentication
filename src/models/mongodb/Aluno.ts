import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { TreinoModel } from "./Treino"

@Entity({ name: 'Aluno' })
export class AlunoModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  userId: string;

  @Column()
  peso?: number;

  @Column()
  altura?: number;

  @Column()
  data_pagamento?: string;

  @Column()
  data_cancelamento?: string;

  @Column()
  treinos?: TreinoModel[];
}
