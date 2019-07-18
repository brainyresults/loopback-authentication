import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { AulaModel } from "./Aula";
import { type } from "os";

@Entity({ name: 'Treino' })
export class TreinoModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  tipo_plano: number;

  @Column()
  objetivos?: number[];

  @Column()
  status?: number;

  @Column()
  dias_treino?: number[];

  @Column()
  horarios?: number[];

  @Column()
  data_adesao?: string;

  @Column()
  data_cancelamento?: string;
 
  @Column()
  data_inicio?: string;

  @Column()
  data_fim?: string;

  @Column(type => AulaModel)
  aulas?: AulaModel[];
}
