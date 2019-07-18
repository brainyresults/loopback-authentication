import { Entity, model, property } from '@loopback/repository';
import { Treino } from './treino.model';

@model({ settings: {} })
export class Aluno extends Entity {
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
    type: 'number',
  })
  peso?: number;

  @property({
    type: 'number',
  })
  altura?: number;

  @property({
    type: 'date',
  })
  data_pagamento?: string;

  @property({
    type: 'date',
  })
  data_cancelamento?: string;

  @property({
    type: 'array',
    itemType: Treino
  })
  treinos?: Treino[];


  constructor(data?: Partial<Aluno>) {
    super(data);
  }
}

export interface AlunoRelations {
  // describe navigational properties here
}

export type AlunoWithRelations = Aluno & AlunoRelations;
