import { ProductPortOut } from '../../../../../application/port/out/product/ProductPortOut.js';
import { SaveProductDTO } from '../../../in/dto/product/SaveProductDTO.js';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../persistence/prisma/PrismaService.js';
import { ProductEntity } from '../../../../../domain/entity/product/ProductEntity.js';
import { UpdateProductDTO } from '../../../in/dto/product/UpdateProductDTO.js';

@Injectable()
export class ProductRepository implements ProductPortOut {
  constructor(private readonly prisma: PrismaService) {}

  async saveProduct(dto: SaveProductDTO): Promise<void> {
    try {
      await this.prisma.$transaction(async (tx: any) => {
        await tx.product.create({
          data: {
            NAME: dto.name,
            PRICE: dto.price,
            CATEGORY_ID: dto.categoryId,
          },
        });
      });
    } catch (error) {
      const e = error as any;

      if (e.code === 'P2002') {
        throw new BadRequestException(
          'Já existe um produto com este nome cadastrado.',
        );
      }

      console.error('Erro na transação de salvar produto:', error);
      throw new InternalServerErrorException(
        'Erro interno ao tentar salvar o produto.',
      );
    }
  }

  async getProductById(id: number): Promise<ProductEntity | null> {
    try {
      const productPrisma = await this.prisma.product.findUnique({
        where: { ID: id },
      });

      if (!productPrisma) {
        return null;
      }

      return new ProductEntity(productPrisma.ID, productPrisma.NAME, productPrisma.PRICE.toNumber(), productPrisma.IS_ACTIVE, productPrisma.CREATED_AT, productPrisma.CATEGORY_ID);
    } catch (error) {
      console.error(`Erro no banco ao buscar o produto ${id}:`, error);
      throw new InternalServerErrorException(
        'Erro interno ao acessar o banco de dados.',
      );
    }
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    try {
      const productsPrisma = await this.prisma.product.findMany();

      return productsPrisma.map(e => {
        return new ProductEntity(
          e.ID,
          e.NAME,
          e.PRICE.toNumber(),
          e.IS_ACTIVE,
          e.CREATED_AT,
          e.CATEGORY_ID
        )
      });
    } catch (error) {
      console.error(`Erro no banco ao buscar os produtos:`, error);
      throw new InternalServerErrorException(
        'Erro interno ao acessar o banco de dados.',
      );
    }
  }

  async updateProduct(productEntity: ProductEntity): Promise<void> {
    try {
      await this.prisma.product.update({
        where: { ID: productEntity.id },
        data: {
          NAME: productEntity.name,
          PRICE: productEntity.price,
          CATEGORY_ID: productEntity.categoryId,
          IS_ACTIVE: productEntity.isActive
        },
      });
    } catch (error) {
      const e = error as any;
      if (e.code === 'P2002') {
        throw new BadRequestException('Já existe um produto com este nome cadastrado.');
      }
      console.error('Erro ao atualizar produto:', error);
      throw new InternalServerErrorException('Erro interno ao atualizar o produto.');
    }
  }

  async deleteProduct(productEntity: ProductEntity): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: { ID: productEntity.id }
      });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw new InternalServerErrorException('Erro interno ao deletar o produto.');
    }
  }
}
