import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ProductDTO } from '../../dto/ProductDTO.js';
import { PRODUCT_PORT_IN } from '../../../../../application/port/in/product/ProductPortIn.js';
import type { ProductPortIn } from '../../../../../application/port/in/product/ProductPortIn.js';

@Controller("product")
export class ProductController {
  constructor(
    @Inject(PRODUCT_PORT_IN)
    private readonly productPortIn: ProductPortIn
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() dto: ProductDTO): Promise<void> {
    await this.productPortIn.saveProduct(dto)
  }
}
