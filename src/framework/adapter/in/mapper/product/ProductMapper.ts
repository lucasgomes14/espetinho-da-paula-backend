import { ProductEntity } from '../../../../../domain/entity/product/ProductEntity.js';
import { ProductDTO } from '../../dto/product/ProductDTO.js';

export class ProductMapper {
  static entityToDTO(product: ProductEntity): ProductDTO {
    const dto: ProductDTO = new ProductDTO();

    dto.id = product.id;
    dto.name = product.name;
    dto.price = product.price;
    dto.isActive = product.isActive;
    dto.createdAt = product.created;
    dto.category = product.categoryId;

    return dto;
  }
}
