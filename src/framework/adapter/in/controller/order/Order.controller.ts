import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Get,
} from '@nestjs/common';
import { ORDER_PORT_IN } from '../../../../../application/port/in/order/OrderPortIn.js';
import type { OrderPortIn } from '../../../../../application/port/in/order/OrderPortIn.js';
import { CreateOrderDTO } from '../../dto/order/CreateOrderDTO.js';
import { AddItemToOrderDTO } from '../../dto/order/AddItemToOrderDTO.js';

@Controller("orders")
export class OrderController {
  constructor(
    @Inject(ORDER_PORT_IN)
    private readonly orderPortIn: OrderPortIn
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() dto: CreateOrderDTO): Promise<void> {
    await this.orderPortIn.createOrder(dto);
  }

  @Patch(":id/close")
  @HttpCode(HttpStatus.OK)
  async closeOrder(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.orderPortIn.closeOrder(id);
  }

  @Post(":id/items")
  @HttpCode(HttpStatus.OK)
  async addItemsToOrder(
    @Param("id", ParseIntPipe) orderId: number,
    @Body() dto: AddItemToOrderDTO
  ): Promise<void> {
    await this.orderPortIn.addItemsToOrder(orderId, dto);
  }

  @Patch(":id/items")
  @HttpCode(HttpStatus.OK)
  async updateItemStatus(
    @Param("id", ParseIntPipe) orderId: number,
    @Body() body: { productName: string; delivered: boolean }
  ): Promise<void> {
    await this.orderPortIn.updateItemStatus(orderId, body);
  }

  @Get()
  async findAllOrders() {
    const orders = await this.orderPortIn.findAllOrders();

    return orders.map(order => ({
      id: order.id,
      tableNumber: order.tableId,
      status: order.status,
      createdAt: order.createdAt,
      totalAmount: order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      items: order.items.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        delivered: item.delivered ?? false,
      })),
    }));
  }
}
