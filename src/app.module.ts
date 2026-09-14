import { Module } from '@nestjs/common';
import { ProductController } from './framework/adapter/in/controller/product/Product.controller.js';
import { ProductService } from './application/usecase/product/product.service.js';
import { PRODUCT_PORT_IN } from './application/port/in/product/ProductPortIn.js';
import { ConfigModule } from '@nestjs/config';
import { PRODUCT_PORT_OUT } from './application/port/out/product/ProductPortOut.js';
import { ProductRepository } from './framework/adapter/out/repository/product/ProductRepository.js';
import { PrismaService } from './framework/adapter/out/persistence/prisma/PrismaService.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ProductController],
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
  ],
})
export class AppModule {}
