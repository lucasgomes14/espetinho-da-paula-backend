import { Controller, Get, HttpCode, HttpStatus, Inject, Param } from '@nestjs/common';
import { CATEGORY_PORT_IN } from '../../../../../../application/port/in/category/CategoryPortIn.js';
import type { CategoryPortIn } from '../../../../../../application/port/in/category/CategoryPortIn.js';
import { CategoryDTO } from '../../../dto/category/CategoryDTO.js';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject(CATEGORY_PORT_IN)
    private readonly categoryPortIn: CategoryPortIn,
  ) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getCategoryById(@Param("id") id: number): Promise<CategoryDTO> {
    return await this.categoryPortIn.getCategoryById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllCategories(): Promise<CategoryDTO[]> {
    return await this.categoryPortIn.getAllCategories();
  }
}
