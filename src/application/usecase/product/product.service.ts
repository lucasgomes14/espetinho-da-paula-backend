import { Inject, Injectable } from '@nestjs/common';
import { ProductPortIn } from '../../port/in/product/ProductPortIn.js';
import { ProductDTO } from '../../../framework/adapter/in/dto/ProductDTO.js';
import { PRODUCT_PORT_OUT } from '../../port/out/product/ProductPortOut.js';
import type { ProductPortOut } from '../../port/out/product/ProductPortOut.js';

@Injectable()
export class ProductService implements ProductPortIn {
  constructor(
    @Inject(PRODUCT_PORT_OUT)
    private readonly productPortOut : ProductPortOut
  ) {}

  async saveProduct(dto: ProductDTO): Promise<void> {
    await this.productPortOut.saveProduct(dto);
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
