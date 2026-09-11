import { Injectable } from '@nestjs/common';
import { ProductPortIn } from '../../port/in/product/ProductPortIn.js';
import { ProductDTO } from '../../../framework/adapter/in/dto/ProductDTO.js';

@Injectable()
export class ProductService implements ProductPortIn {
  async saveProduct(dto: ProductDTO): Promise<void> {

  }

  async getProduct(id: number): Promise<ProductDTO> {
    throw new Error('Method not implemented.');
  }

  async updateProduct(dto: ProductDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteProduct(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
