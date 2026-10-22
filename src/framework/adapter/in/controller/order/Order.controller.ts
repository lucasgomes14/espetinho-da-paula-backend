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

  // 1. Abrir comanda / Adicionar produtos a uma mesa (Ocupa a mesa)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() dto: CreateOrderDTO): Promise<void> {
    await this.orderPortIn.createOrder(dto);
  }

  // 2. Fechar comanda de uma mesa (Libera a mesa novamente)
  @Patch(":id/close")
  @HttpCode(HttpStatus.OK)
  async closeOrder(@Param("id", ParseIntPipe) id: number): Promise<void> {
    await this.orderPortIn.closeOrder(id);
  }

  // Adicionar mais produtos a uma comanda que já está aberta
  @Post(":id/items")
  @HttpCode(HttpStatus.OK)
  async addItemsToOrder(
    @Param("id", ParseIntPipe) orderId: number,
    @Body() dto: AddItemToOrderDTO
  ): Promise<void> {
    await this.orderPortIn.addItemsToOrder(orderId, dto);
  }
}
