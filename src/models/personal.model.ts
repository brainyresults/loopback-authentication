import { Entity, model, property } from '@loopback/repository';
import { MarcacaoAula } from './marcacao-aula.model';

@model({ settings: {} })
export class Personal extends Entity {
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
    type: 'array',
    itemType: 'number',
  })
  especialidades?: number[];

  @property({
    type: 'string',
  })
  experiencia?: string;

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
    type: 'array',
    itemType: MarcacaoAula,
  })
  marcacoes?: MarcacaoAula[];

  @property({
    type: 'number',
  })
  avaliacao?: number;

  @property({
    type: 'number',
    default: 0,
  })
  visitas?: number;

  constructor(data?: Partial<Personal>) {
    super(data);
  }
}

export interface PersonalRelations {
  // describe navigational properties here
}

export type PersonalWithRelations = Personal & PersonalRelations;
