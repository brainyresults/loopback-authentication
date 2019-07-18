import {Model, model, property} from '@loopback/repository';

@model({settings: {}})
export class Atividade extends Model {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  status?: number;

  @property({
    type: 'number',
    default: 1,
  })
  semana?: number;

  @property({
    type: 'date',
  })
  data_atividade?: string;

  @property({
    type: 'string',
  })
  exercicio?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  se_ativo?: boolean;

  constructor(data?: Partial<Atividade>) {
    super(data);
  }
}

export interface AtividadeRelations {
  // describe navigational properties here
}

export type AtividadeWithRelations = Atividade & AtividadeRelations;
