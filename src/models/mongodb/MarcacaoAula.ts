import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: 'MarcacaoAula' })
export class MarcacaoAulaModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  alunoId: string;

  @Column()
  aulaId?: string;

  @Column()
  data_solicitacao: Date;

  @Column()
  data_inicio?: Date;

  @Column()
  data_fim?: Date;
}
