import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class Client extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'date',
  })
  data_pagamento?: string;

  @property({
    type: 'date',
  })
  data_cancelamento?: string;


  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
