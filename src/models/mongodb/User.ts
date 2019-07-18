import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";

@Entity({ name: 'User' })
export class UserModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  tipo_user: number;

  @Column()
  cidade?: string;

  @Column()
  data_nascimento?: string;

  @Column()
  sexo: number;

  @Column()
  se_ativo?: boolean;
}
