import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderPortIn } from '../../port/in/order/OrderPortIn.js';
import type { OrderPortOut } from '../../port/out/order/OrderPortOut.js';
import { ORDER_PORT_OUT } from '../../port/out/order/OrderPortOut.js';
import { CreateOrderDTO } from '../../../framework/adapter/in/dto/order/CreateOrderDTO.js';
import { AddItemToOrderDTO } from '../../../framework/adapter/in/dto/order/AddItemToOrderDTO.js';
import { OrderEntity, OrderStatus } from '../../../domain/entity/order/OrderEntity.js';

@Injectable()
export class OrderService implements OrderPortIn {
  constructor(
    @Inject(ORDER_PORT_OUT)
    private readonly orderPortOut: OrderPortOut,
  ) {}

  async createOrder(dto: CreateOrderDTO): Promise<void> {
    const existingOrder = await this.orderPortOut.findActiveOrderByTableId(dto.tableId);

    if (existingOrder) {
      throw new BadRequestException(`A mesa ${dto.tableId} já possui uma comanda ativa.`);
    }

    const newOrder = new OrderEntity(
      0,
      dto.tableId,
      OrderStatus.OPEN,
      dto.items.map(item => ({
        productId: item.productId,
        productName: '',
        quantity: item.quantity,
        price: 0,
      }))
    );

    await this.orderPortOut.saveOrder(newOrder);
  }

  async closeOrder(orderId: number): Promise<void> {
    const order = await this.orderPortOut.getOrderById(orderId);

    if (!order) {
      throw new NotFoundException(`Comanda com ID ${orderId} não encontrada.`);
    }

    order.closeOrder();
    await this.orderPortOut.updateOrder(order);
  }

  async addItemsToOrder(orderId: number, dto: AddItemToOrderDTO): Promise<void> {
    const order = await this.orderPortOut.getOrderById(orderId);

    if (!order) {
      throw new NotFoundException(`Comanda com ID ${orderId} não encontrada.`);
    }

    for (const item of dto.items) {
      order.addItem(item.productId, '', item.quantity, 0);
    }

    await this.orderPortOut.updateOrder(order);
  }
}
