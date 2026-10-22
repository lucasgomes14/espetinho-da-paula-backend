import { CreateOrderDTO } from '../../../../framework/adapter/in/dto/order/CreateOrderDTO.js';
import { AddItemToOrderDTO } from '../../../../framework/adapter/in/dto/order/AddItemToOrderDTO.js';

export const ORDER_PORT_IN = "ORDER_PORT_IN";

export interface OrderPortIn {
  createOrder(dto: CreateOrderDTO): Promise<void>;
  closeOrder(id: number): Promise<void>;
  addItemsToOrder(orderId: number, dto: AddItemToOrderDTO): Promise<void>;
}
