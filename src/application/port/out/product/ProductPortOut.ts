import { SaveProductDTO } from '../../../../framework/adapter/in/dto/SaveProductDTO.js';
import { ProductEntity } from '../../../../domain/entity/product/ProductEntity.js';

export const PRODUCT_PORT_OUT = 'PRODUCT_PORT_OUT';

export interface ProductPortOut {
  saveProduct(dto: SaveProductDTO): Promise<void>;
  getProductById(id: number): Promise<ProductEntity | null>;
  getAllProducts(): Promise<ProductEntity[]>;
}
