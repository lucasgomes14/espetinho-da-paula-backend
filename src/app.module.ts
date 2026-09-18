import { Module } from '@nestjs/common';
import { ProductController } from './framework/adapter/in/controller/product/Product.controller.js';
import { ProductService } from './application/usecase/product/product.service.js';
import { PRODUCT_PORT_IN } from './application/port/in/product/ProductPortIn.js';
import { ConfigModule } from '@nestjs/config';
import { PRODUCT_PORT_OUT } from './application/port/out/product/ProductPortOut.js';
import { ProductRepository } from './framework/adapter/out/repository/product/ProductRepository.js';
import { PrismaService } from './framework/adapter/out/persistence/prisma/PrismaService.js';
import { CategoryController } from './framework/adapter/in/controller/category/category/Category.controller.js';
import { CategoryService } from './application/usecase/category/category/Category.service.js';
import { CATEGORY_PORT_IN } from './application/port/in/category/CategoryPortIn.js';
import { CATEGORY_PORT_OUT } from './application/port/out/category/CategoryPortOut.js';
import { CategoryRepository } from './framework/adapter/out/repository/category/CategoryRepository.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ProductController, CategoryController],
  providers: [
    PrismaService,
    {
      provide: PRODUCT_PORT_IN,
      useClass: ProductService,
    },
    {
      provide: PRODUCT_PORT_OUT,
      useClass: ProductRepository,
    },
    {
      provide: CATEGORY_PORT_IN,
      useClass: CategoryService,
    },
    {
      provide: CATEGORY_PORT_OUT,
      useClass: CategoryRepository,
    }
  ],
})
export class AppModule {}
