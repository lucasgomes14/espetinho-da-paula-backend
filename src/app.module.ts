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
import { TABLE_PORT_IN } from './application/port/in/table/TablePortIn.js';
import { TABLE_PORT_OUT } from './application/port/out/table/TablePortOut.js';
import { TableRepository } from './framework/adapter/out/repository/table/TableRepository.js';
import { TableService } from './application/usecase/table/Table.service.js';
import { OrderService } from './application/usecase/order/Order.service.js';
import { OrderRepository } from './framework/adapter/out/repository/order/OrderRepository.js';
import { ORDER_PORT_IN } from './application/port/in/order/OrderPortIn.js';
import { ORDER_PORT_OUT } from './application/port/out/order/OrderPortOut.js';
import { TableController } from './framework/adapter/in/controller/table/Table.controller.js';
import { OrderController } from './framework/adapter/in/controller/order/Order.controller.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [ProductController, CategoryController, TableController, OrderController],
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
    },
    {
      provide: TABLE_PORT_IN,
      useClass: TableService,
    },
    {
      provide: TABLE_PORT_OUT,
      useClass: TableRepository,
    },
    {
      provide: ORDER_PORT_IN,
      useClass: OrderService,
    },
    {
      provide: ORDER_PORT_OUT,
      useClass: OrderRepository,
    }
  ],
})
export class AppModule {}
