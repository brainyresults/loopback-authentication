import {Model, model, property} from '@loopback/repository';
import { Aula } from './aula.model';

@model({settings: {}})
export class Treino extends Model {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  tipo_plano: number;

  @property({
    type: 'array',
    itemType: 'number'
  })
  objetivos?: number[];

  @property({
    type: 'number',
  })
  status?: number;

  @property({
    type: 'array',
    itemType: 'number'
  })
  dias_treino?: number[];

  @property({
    type: 'array',
    itemType: 'number'
  })
  horarios?: number[];

  @property({
    type: 'date',
  })
  data_adesao?: string;

  @property({
    type: 'date',
  })
  data_cancelamento?: string;
 
  @property({
    type: 'date',
  })
  data_inicio?: string;

  @property({
    type: 'date',
  })
  data_fim?: string;

  @property({
    type: 'array',
    itemType: Aula
  })
  aulas?: Aula[];


  constructor(data?: Partial<Treino>) {
    super(data);
  }
}

export interface TreinoRelations {
  // describe navigational properties here
}

export type TreinoWithRelations = Treino & TreinoRelations;
