import { Module } from '@nestjs/common';
import { ProductController } from './framework/adapter/in/controller/product/product.controller.js';
import { ProductService } from './application/usecase/product/product.service.js';
import { PRODUCT_PORT_IN } from './application/port/in/product/ProductPortIn.js';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: PRODUCT_PORT_IN,
      useClass: ProductService,
    }
  ],
})
export class AppModule {}
