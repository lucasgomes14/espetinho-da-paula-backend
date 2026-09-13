import { ProductPortOut } from '../../../../../application/port/out/product/ProductPortOut.js';
import { ProductDTO } from '../../../in/dto/ProductDTO.js';
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../persistence/prisma/PrismaService.js';

@Injectable()
export class ProductRepository implements ProductPortOut {
  constructor(private readonly prisma: PrismaService) {}

  async saveProduct(dto: ProductDTO): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx: any) => {
        await tx.product.create({
          data: {
            NAME: dto.name,
            PRICE: dto.price,
            CATEGORY: dto.category,
          }
        });
      })
    } catch (error) {
      const e = error as any;

      if (e.code === "P2002") {
        throw new BadRequestException("Já existe um produto com este nome cadastrado.");
      }

      console.error("Erro na transação de salvar produto:", error);
      throw new InternalServerErrorException("Erro interno ao tentar salvar o produto.");

    }
  }
}
