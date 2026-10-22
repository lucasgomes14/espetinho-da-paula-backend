import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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
          price: item.price ? Number(item.price) : 0,
        })),
        orderPrisma.createdAt,
      );
    } catch (error) {
      console.error(`Erro ao buscar comanda ativa para a mesa ${tableId}:`, error);
      throw new InternalServerErrorException('Erro interno ao acessar o banco de dados.');
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
          price: item.price ? Number(item.price) : 0,
        })),
        orderPrisma.createdAt,
      );
    } catch (error) {
      console.error(`Erro ao buscar comanda ${id}:`, error);
      throw new InternalServerErrorException('Erro interno ao acessar o banco de dados.');
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

          if (!product) {
            throw new NotFoundException(`Produto com ID ${item.productId} não foi encontrado.`);
          }

          await tx.orderItem.create({
            data: {
              orderId: createdOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              price: product.PRICE,
            },
          });
        }
      });
    } catch (error) {
      console.error('Erro ao salvar comanda:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Erro interno ao tentar salvar a comanda.');
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

          if (!product) {
            throw new NotFoundException(`Produto com ID ${item.productId} não foi encontrado.`);
          }

          await tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: product.PRICE,
            },
          });
        }
      });
    } catch (error) {
      console.error('Erro ao atualizar comanda:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Erro interno ao atualizar a comanda.');
    }
  }

  async findAllOrders(): Promise<OrderEntity[]> {
    try {
      const ordersPrisma = await this.prisma.order.findMany({
        include: {
          items: {
            include: { product: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return ordersPrisma.map((orderPrisma: any) =>
        new OrderEntity(
          orderPrisma.id,
          orderPrisma.tableId,
          orderPrisma.status as OrderStatus,
          orderPrisma.items.map((item: any) => ({
            productId: item.productId,
            productName: item.product?.NAME || '',
            quantity: item.quantity,
            price: item.price ? Number(item.price) : 0,
          })),
          orderPrisma.createdAt,
        )
      );
    } catch (error) {
      console.error('Erro ao buscar todas as comandas:', error);
      throw new InternalServerErrorException('Erro interno ao acessar o banco de dados.');
    }
  }
}
