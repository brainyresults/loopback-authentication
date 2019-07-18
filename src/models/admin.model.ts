import { Entity, model, property } from '@loopback/repository';
import { Vendor } from "./vendor.model";

@model({ settings: {} })
export class Admin extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'array',
    itemType: Vendor,
  })
  vendors?: Vendor[];

  constructor(data?: Partial<Admin>) {
    super(data);
  }
}

export interface AdminRelations {
  // describe navigational properties here
}

export type AdminWithRelations = Admin & AdminRelations;
