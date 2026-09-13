import { ProductDTO } from '../../../../framework/adapter/in/dto/ProductDTO.js';

export const PRODUCT_PORT_OUT = "PRODUCT_PORT_OUT";

export interface ProductPortOut {
  saveProduct(dto: ProductDTO): Promise<void>;
}
