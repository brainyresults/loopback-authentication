import { Entity, model, property } from '@loopback/repository';

@model({ settings: {} })
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'number',
    default: 0,
  })
  user_role: number;

  @property({
    type: 'string',
  })
  nome: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  password: string;

  @property({
    type: 'string',
  })
  cidade?: string;

  @property({
    type: 'date',
  })
  data_nascimento?: string;

  @property({
    type: 'number',
    default: 0,
  })
  sexo?: number;

  @property({
    type: 'boolean',
    default: true,
  })
  se_ativo?: boolean;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
