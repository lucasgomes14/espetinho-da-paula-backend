import { CategoryDTO } from '../../../../framework/adapter/in/dto/category/CategoryDTO.js';

export const CATEGORY_PORT_IN = "CATEGORY_PORT_IN";

export interface CategoryPortIn {
  getCategoryById(id: number): Promise<CategoryDTO>
  getAllCategories(): Promise<CategoryDTO[]>
}
