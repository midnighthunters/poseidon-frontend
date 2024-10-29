/* tslint:disable */
/* eslint-disable */
import { Address } from '../models/address';
export interface User {
  createdAt?: string;
  email?: string;
  id?: string;
  phone?: string;
  shippingAddresses?: Array<Address>;
  updatedAt?: string;
  username?: string;
  version?: number;
}
