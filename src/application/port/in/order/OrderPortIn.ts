import { CreateOrderDTO } from '../../../../framework/adapter/in/dto/order/CreateOrderDTO.js';
import { AddItemToOrderDTO } from '../../../../framework/adapter/in/dto/order/AddItemToOrderDTO.js';
import { OrderEntity } from '../../../../domain/entity/order/OrderEntity.js';
import { UpdateItemStatusDTO } from '../../../../framework/adapter/in/dto/order/UpdateItemStatusDTO.js';

export const ORDER_PORT_IN = "ORDER_PORT_IN";

export interface OrderPortIn {
  createOrder(dto: CreateOrderDTO): Promise<void>;
  closeOrder(id: number): Promise<void>;
  addItemsToOrder(orderId: number, dto: AddItemToOrderDTO): Promise<void>;
  findAllOrders(): Promise<OrderEntity[]>;
  updateItemStatus(orderId: number, dto: UpdateItemStatusDTO): Promise<void>;
}
