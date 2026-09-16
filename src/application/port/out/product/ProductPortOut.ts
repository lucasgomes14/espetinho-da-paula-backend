import { SaveProductDTO } from '../../../../framework/adapter/in/dto/product/SaveProductDTO.js';
import { ProductEntity } from '../../../../domain/entity/product/ProductEntity.js';
import { UpdateProductDTO } from '../../../../framework/adapter/in/dto/product/UpdateProductDTO.js';

export const PRODUCT_PORT_OUT = 'PRODUCT_PORT_OUT';

export interface ProductPortOut {
  saveProduct(dto: SaveProductDTO): Promise<void>;
  getProductById(id: number): Promise<ProductEntity | null>;
  getAllProducts(): Promise<ProductEntity[]>;
  updateProduct(product: ProductEntity): Promise<void>;
  deleteProduct(product: ProductEntity): Promise<void>;
}
