import { OrderEntity } from '../../../../domain/entity/order/OrderEntity.js';

export const ORDER_PORT_OUT = 'ORDER_PORT_OUT';

export interface OrderPortOut {
  findActiveOrderByTableId(tableId: number): Promise<OrderEntity | null>;
  getOrderById(id: number): Promise<OrderEntity | null>;
  saveOrder(order: OrderEntity): Promise<void>;
  updateOrder(order: OrderEntity): Promise<void>;
}
