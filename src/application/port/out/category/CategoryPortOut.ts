import { CategoryEntity } from '../../../../domain/entity/product/CategoryEntity.js';

export const CATEGORY_PORT_OUT = 'CATEGORY_PORT_OUT';

export interface CategoryPortOut {
  getCategoryById(id: number): Promise<CategoryEntity | null>;
  getAllCategories(): Promise<CategoryEntity[]>;
}
