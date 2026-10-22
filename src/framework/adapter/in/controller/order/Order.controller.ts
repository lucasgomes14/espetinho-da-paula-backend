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
}
