import { Model, model, property } from '@loopback/repository';

@model({ settings: {} })
export class MarcacaoAula extends Model {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  alunoId: string;

  @property({
    type: 'string',
  })
  aulaId?: string;

  @property({
    type: 'date',
    required: true,
  })
  data_solicitacao: Date;

  @property({
    type: 'date',
  })
  data_inicio?: Date;

  @property({
    type: 'date',
  })
  data_fim?: Date;

  constructor(data?: Partial<MarcacaoAula>) {
    super(data);
  }
}

export interface MarcacaoAulaRelations {
  // describe navigational properties here
}

export type MarcacaoAulaWithRelations = MarcacaoAula & MarcacaoAulaRelations;
