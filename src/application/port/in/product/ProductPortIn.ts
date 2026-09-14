import { SaveProductDTO } from '../../../../framework/adapter/in/dto/SaveProductDTO.js';
import { ProductDTO } from '../../../../framework/adapter/in/dto/ProductDTO.js';

export const PRODUCT_PORT_IN = "PRODUCT_PORT_IN";

export interface ProductPortIn {
  saveProduct(dto: SaveProductDTO): Promise<void>;
  getProductById(id: number): Promise<ProductDTO>;
  getAllProducts(): Promise<ProductDTO[]>;
  updateProduct(dto: SaveProductDTO): Promise<void>;
  deleteProduct(id: number): Promise<void>;
}
