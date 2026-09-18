import { CategoryEntity } from '../../../../../domain/entity/product/CategoryEntity.js';
import { CategoryDTO } from '../../dto/category/CategoryDTO.js';

export class CategoryMapper {
  static entityToDTO(category: CategoryEntity): CategoryDTO {
    const dto: CategoryDTO = new CategoryDTO();

    dto.id = category.id;
    dto.name = category.name;

    return dto;
  }
}
