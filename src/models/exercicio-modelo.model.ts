import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class ExercicioModelo extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  autor?: string;

  @property({
    type: 'string',
  })
  nome?: string;

  @property({
    type: 'number',
  })
  regiao?: number;

  @property({
    type: 'number',
  })
  tempo_medio?: number;

  @property({
    type: 'number',
  })
  intervalo?: number;

  @property({
    type: 'string',
  })
  video?: string;

  @property({
    type: 'string',
  })
  descricao?: string;


  constructor(data?: Partial<ExercicioModelo>) {
    super(data);
  }
}

export interface ExercicioModeloRelations {
  // describe navigational properties here
}

export type ExercicioModeloWithRelations = ExercicioModelo & ExercicioModeloRelations;
