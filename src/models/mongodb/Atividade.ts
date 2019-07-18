import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: 'Atividade' })
export class AtividadeModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  status?: number;

  @Column()
  semana?: number;

  @Column()
  data_atividade?: string;

  @Column()
  exercicio?: string;

  @Column()
  se_ativo?: boolean;
}
