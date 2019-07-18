import {Model, model, property} from '@loopback/repository';

@model({settings: {}})
export class Exercicio extends Model {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  ordem?: number;

  @property({
    type: 'number',
  })
  dia?: number;

  @property({
    type: 'string',
  })
  modelo?: string;

  @property({
    type: 'number',
  })
  carga?: number;

  @property({
    type: 'number',
  })
  repeticao?: number;

  @property({
    type: 'string',
  })
  intervalo?: string;

  @property({
    type: 'string',
  })
  descricao_adicional?: string;

  @property({
    type: 'number',
  })
  tempo_medio?: number;

  @property({
    type: 'number',
  })
  tempo_medio_total?: number;


  constructor(data?: Partial<Exercicio>) {
    super(data);
  }
}

export interface ExercicioRelations {
  // describe navigational properties here
}

export type ExercicioWithRelations = Exercicio & ExercicioRelations;
