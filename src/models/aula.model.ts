import {Model, model, property} from '@loopback/repository';
import { Exercicio } from './exercicio.model';
import { Atividade } from './atividade.model';

@model({settings: {}})
export class Aula extends Model {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  responsavel?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'number',
  })
  semana_atual?: number;

  @property({
    type: 'number',
  })
  total_semanas?: number;

  @property({
    type: 'array',
    itemType: 'string',
  })
  avaliacoes?: string[];

  @property({
    type: 'array',
    itemType: Exercicio,
  })
  exercicios?: Exercicio[];

  @property({
    type: 'array',
    itemType: Atividade,
  })
  atividades?: Atividade[];

  @property({
    type: 'date',
  })
  data_inicio?: string;

  @property({
    type: 'date',
  })
  data_fim?: string;


  constructor(data?: Partial<Aula>) {
    super(data);
  }
}

export interface AulaRelations {
  // describe navigational properties here
}

export type AulaWithRelations = Aula & AulaRelations;
