import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { AtividadeModel } from "./Atividade";
import { ExercicioModel } from "./Exercicio";
import { type } from "os";

@Entity({ name: 'Aula' })
export class AulaModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  responsavel?: string;

  @Column()
  status?: string;

  @Column()
  semana_atual?: number;

  @Column()
  total_semanas?: number;

  @Column()
  avaliacoes?: string[];

  @Column(type => ExercicioModel)
  exercicios?: ExercicioModel[];

  @Column(type => AtividadeModel)
  atividades?: AtividadeModel[];

  @Column()
  data_inicio?: string;

  @Column()
  data_fim?: string;
}
