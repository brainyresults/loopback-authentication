import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: 'ExercicioModelo' })
export class ExercicioModeloModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  autor?: string;

  @Column()
  nome?: string;

  @Column()
  regiao?: number;

  @Column()
  tempo_medio?: number;

  @Column()
  intervalo?: number;

  @Column()
  video?: string;

  @Column()
  descricao?: string;
}
