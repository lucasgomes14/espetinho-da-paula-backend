import { ProductDTO } from '../../../../framework/adapter/in/dto/ProductDTO.js';

export const PRODUCT_PORT_IN = "PRODUCT_PORT_IN";

export interface ProductPortIn {
  saveProduct(dto: ProductDTO): Promise<void>;
  getProduct(id: number): Promise<ProductDTO>;
  updateProduct(dto: ProductDTO): Promise<void>;
  deleteProduct(id: number): Promise<void>;
}
