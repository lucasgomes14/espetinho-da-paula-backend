import { Injectable } from '@nestjs/common';
import { TablePortOut } from '../../../../../application/port/out/table/TablePortOut.js';
import { TableEntity } from '../../../../../domain/entity/table/TableEntity.js';
import { PrismaService } from '../../persistence/prisma/PrismaService.js';

@Injectable()
export class TableRepository implements TablePortOut {
  constructor(private readonly prisma: PrismaService) {}

  async findAllTablesWithStatus(): Promise<TableEntity[]> {
    try {
      const tablesPrisma = await this.prisma.table.findMany({
        include: {
          orders: {
            where: { status: 'OPEN' },
            include: {
              items: {
                include: { product: true },
              },
            },
          },
        },
        orderBy: { number: 'asc' },
      });

      return tablesPrisma.map((table: any) => {
        const activeOrder = table.orders.length > 0 ? table.orders[0] : null;

        const entity = new TableEntity(table.id, table.number, !!activeOrder);

        if (activeOrder) {
          entity.occupy({
            id: activeOrder.id,
            items: activeOrder.items.map((item: any) => ({
              productId: item.productId,
              productName: item.product?.NAME || '',
              quantity: item.quantity,
              price: item.price.toNumber(),
            })),
            createdAt: activeOrder.createdAt,
          });
        }

        return entity;
      });
    } catch (error) {
      console.error('Erro no banco ao buscar as mesas:', error);
      throw new Error('Erro interno ao acessar o banco de dados.');
    }
  }
}
