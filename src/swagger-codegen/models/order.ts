/* tslint:disable */
/* eslint-disable */
import { OrderItem } from '../models/order-item';
export interface Order {
  createdAt?: string;
  id?: string;
  orderStatus?: string;
  products?: Array<OrderItem>;
  totalAmount?: number;
  transactionInfo?: {
};
  updatedAt?: string;
  userId?: string;
  version?: number;
}
