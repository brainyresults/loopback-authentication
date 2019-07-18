import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: 'Client' })
export class ClientModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  userId: string;

  @Column()
  data_pagamento?: string;

  @Column()
  data_cancelamento?: string;

}
