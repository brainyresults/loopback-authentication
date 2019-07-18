import { Entity, ObjectIdColumn, ObjectID, Column } from "typeorm";
import { VendorModel } from "./Vendor";

@Entity({ name: 'Admin' })
export class AdminModel {

  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  userId: string;

  @Column()
  vendors: VendorModel[];
}
