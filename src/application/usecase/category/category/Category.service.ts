import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { CategoryPortOut } from '../../../port/out/category/CategoryPortOut.js';
import { CATEGORY_PORT_OUT } from '../../../port/out/category/CategoryPortOut.js';
import { CategoryDTO } from '../../../../framework/adapter/in/dto/category/CategoryDTO.js';
import { CategoryPortIn } from '../../../port/in/category/CategoryPortIn.js';
import { CategoryMapper } from '../../../../framework/adapter/in/mapper/category/CategoryMapper.js';

@Injectable()
export class CategoryService implements CategoryPortIn {
  constructor(
    @Inject(CATEGORY_PORT_OUT)
    private readonly categoryPortOut: CategoryPortOut,
  ) {}

  async getCategoryById(id: number): Promise<CategoryDTO> {
    const category = await this.categoryPortOut.getCategoryById(id);

    if (!category) {
      throw new NotFoundException(`Categoria com o id ${id} não encontrado`);
    }

    return CategoryMapper.entityToDTO(category);
  }

  async getAllCategories(): Promise<CategoryDTO[]> {
    const categoryEntity = await this.categoryPortOut.getAllCategories();

    return categoryEntity.map(c => CategoryMapper.entityToDTO(c));
  }
}
