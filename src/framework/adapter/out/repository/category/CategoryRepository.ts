import { CategoryPortOut } from '../../../../../application/port/out/category/CategoryPortOut.js';
import { PrismaService } from '../../persistence/prisma/PrismaService.js';
import { CategoryEntity } from '../../../../../domain/entity/product/CategoryEntity.js';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CategoryRepository implements CategoryPortOut {
  constructor(private readonly prisma: PrismaService) {
  }

  async getCategoryById(id: number): Promise<CategoryEntity | null> {
    try {
      const categoryPrisma = await this.prisma.category.findUnique({
        where: { ID: id },
      });

      if (!categoryPrisma) {
        return null;
      }

      return new CategoryEntity(
        categoryPrisma.ID,
        categoryPrisma.NAME
      );
    } catch (error) {
      console.error(`Erro no banco ao buscar o categoria ${id}:`, error);
      throw new InternalServerErrorException(
        'Erro interno ao acessar o banco de dados.',
      );
    }
  }

  async getAllCategories(): Promise<CategoryEntity[]> {
    try {
      const categoriesPrisma = await this.prisma.category.findMany();

      return categoriesPrisma.map((c) => {
        return new CategoryEntity(
          c.ID,
          c.NAME
        );
      });
    } catch (error) {
      console.error(`Erro no banco ao buscar as categorias:`, error);
      throw new InternalServerErrorException(
        'Erro interno ao acessar o banco de dados.',
      );
    }
  }
}
