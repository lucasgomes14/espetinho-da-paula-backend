import { SaveProductDTO } from '../../../../framework/adapter/in/dto/product/SaveProductDTO.js';
import { ProductDTO } from '../../../../framework/adapter/in/dto/product/ProductDTO.js';
import { UpdateProductDTO } from '../../../../framework/adapter/in/dto/product/UpdateProductDTO.js';

export const PRODUCT_PORT_IN = "PRODUCT_PORT_IN";

export interface ProductPortIn {
  saveProduct(dto: SaveProductDTO): Promise<void>;
  getProductById(id: number): Promise<ProductDTO>;
  getAllProducts(): Promise<ProductDTO[]>;
  updateProduct(id: number,dto: UpdateProductDTO): Promise<void>;
  deleteProduct(id: number): Promise<void>;
}
