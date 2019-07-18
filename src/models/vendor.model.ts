import { Entity, model, property } from '@loopback/repository';
import { Client } from "./client.model";

@model({ settings: {} })
export class Vendor extends Entity {
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
    itemType: Client,
  })
  clients?: Client[];

  constructor(data?: Partial<Vendor>) {
    super(data);
  }
}

export interface VendorRelations {
  // describe navigational properties here
}

export type VendorWithRelations = Vendor & VendorRelations;
