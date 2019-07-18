import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: 'Personal' })
export class PersonalModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  userId: string;

  @Column()
  especialidades?: number[];

  @Column()
  experiencia?: string;

  @Column()
  dias_treino?: number[];

  @Column()
  horarios?: number[];

  @Column()
  marcacoes?: string[];

  @Column()
  avaliacao?: number;

  @Column()
  visitas?: number;
}
