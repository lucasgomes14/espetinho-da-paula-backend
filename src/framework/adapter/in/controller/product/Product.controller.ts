import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SaveProductDTO } from '../../dto/SaveProductDTO.js';
import { PRODUCT_PORT_IN } from '../../../../../application/port/in/product/ProductPortIn.js';
import type { ProductPortIn } from '../../../../../application/port/in/product/ProductPortIn.js';
import { ProductDTO } from '../../dto/ProductDTO.js';

@Controller("product")
export class ProductController {
  constructor(
    @Inject(PRODUCT_PORT_IN)
    private readonly productPortIn: ProductPortIn
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() dto: SaveProductDTO): Promise<void> {
    await this.productPortIn.saveProduct(dto)
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param("id", ParseIntPipe) id: number ): Promise<ProductDTO> {
    return await this.productPortIn.getProductById(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProducts(): Promise<ProductDTO[]> {
    return await this.productPortIn.getAllProducts();
  }
}
