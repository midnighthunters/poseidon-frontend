/* tslint:disable */
/* eslint-disable */
import { CartItem } from '../models/cart-item';
export interface Cart {
  createdAt?: string;
  id?: string;
  products?: Array<CartItem>;
  updatedAt?: string;
  userId?: string;
  version?: number;
}
