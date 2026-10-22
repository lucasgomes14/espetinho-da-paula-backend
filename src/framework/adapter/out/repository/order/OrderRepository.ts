import { Injectable } from '@nestjs/common';
import { OrderPortOut } from '../../../../../application/port/out/order/OrderPortOut.js';
import { OrderEntity, OrderStatus } from '../../../../../domain/entity/order/OrderEntity.js';
import { PrismaService } from '../../persistence/prisma/PrismaService.js';

@Injectable()
export class OrderRepository implements OrderPortOut {
  constructor(private readonly prisma: PrismaService) {}

  async findActiveOrderByTableId(tableId: number): Promise<OrderEntity | null> {
    try {
      const orderPrisma = await this.prisma.order.findFirst({
        where: {
          tableId: tableId,
          status: 'OPEN',
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      if (!orderPrisma) return null;

      return new OrderEntity(
        orderPrisma.id,
        orderPrisma.tableId,
        orderPrisma.status as OrderStatus,
        orderPrisma.items.map((item: any) => ({
          productId: item.productId,
          productName: item.product?.NAME || '',
          quantity: item.quantity,
          price: item.price.toNumber(),
        })),
        orderPrisma.createdAt,
      );
    } catch (error) {
      console.error(`Erro ao buscar comanda ativa para a mesa ${tableId}:`, error);
      throw new Error('Erro interno ao acessar o banco de dados.');
    }
  }

  async getOrderById(id: number): Promise<OrderEntity | null> {
    try {
      const orderPrisma = await this.prisma.order.findUnique({
        where: { id: id },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      if (!orderPrisma) return null;

      return new OrderEntity(
        orderPrisma.id,
        orderPrisma.tableId,
        orderPrisma.status as OrderStatus,
        orderPrisma.items.map((item: any) => ({
          productId: item.productId,
          productName: item.product?.NAME || '',
          quantity: item.quantity,
          price: item.price.toNumber(),
        })),
        orderPrisma.createdAt,
      );
    } catch (error) {
      console.error(`Erro ao buscar comanda ${id}:`, error);
      throw new Error('Erro interno ao acessar o banco de dados.');
    }
  }

  async saveOrder(order: OrderEntity): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx: any) => {
        const createdOrder = await tx.order.create({
          data: {
            tableId: order.tableId,
            status: order.status,
          },
        });

        for (const item of order.items) {
          const product = await tx.product.findUnique({
            where: { ID: item.productId },
          });

          const unitPrice = product ? product.PRICE : 0;

          await tx.orderItem.create({
            data: {
              orderId: createdOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              price: unitPrice,
            },
          });
        }
      });
    } catch (error) {
      console.error('Erro ao salvar comanda:', error);
      throw new Error('Erro interno ao tentar salvar a comanda.');
    }
  }

  async updateOrder(order: OrderEntity): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx: any) => {
        await tx.order.update({
          where: { id: order.id },
          data: { status: order.status },
        });

        await tx.orderItem.deleteMany({
          where: { orderId: order.id },
        });

        for (const item of order.items) {
          const product = await tx.product.findUnique({
            where: { ID: item.productId },
          });

          const unitPrice = product ? product.PRICE : item.price;

          await tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: unitPrice,
            },
          });
        }
      });
    } catch (error) {
      console.error('Erro ao atualizar comanda:', error);
      throw new Error('Erro interno ao atualizar a comanda.');
    }
  }
}
