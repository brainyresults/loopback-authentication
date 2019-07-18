import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { ClientModel } from "./Client";

@Entity({ name: 'Vendor' })
export class VendorModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  userId: string;

  @Column()
  clients: ClientModel[];
}
