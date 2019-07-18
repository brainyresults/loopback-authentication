import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: 'Exercicio' })
export class ExercicioModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  ordem?: number;

  @Column()
  dia?: number;

  @Column()
  modelo?: string;

  @Column()
  carga?: number;

  @Column()
  repeticao?: number;

  @Column()
  intervalo?: string;

  @Column()
  descricao_adicional?: string;

  @Column()
  tempo_medio?: number;

  @Column()
  tempo_medio_total?: number;
}
