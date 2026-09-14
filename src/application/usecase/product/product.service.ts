import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductPortIn } from '../../port/in/product/ProductPortIn.js';
import { SaveProductDTO } from '../../../framework/adapter/in/dto/SaveProductDTO.js';
import { PRODUCT_PORT_OUT } from '../../port/out/product/ProductPortOut.js';
import type { ProductPortOut } from '../../port/out/product/ProductPortOut.js';
import { ProductDTO } from '../../../framework/adapter/in/dto/ProductDTO.js';
import { ProductMapper } from '../../../framework/adapter/in/mapper/ProductMapper.js';
import { ProductEntity } from '../../../domain/entity/product/ProductEntity.js';

@Injectable()
export class ProductService implements ProductPortIn {
  constructor(
    @Inject(PRODUCT_PORT_OUT)
    private readonly productPortOut : ProductPortOut
  ) {}

  async saveProduct(dto: SaveProductDTO): Promise<void> {
    await this.productPortOut.saveProduct(dto);
  }

  async getProductById(id: number): Promise<ProductDTO> {
    const product = await this.productPortOut.getProductById(id);

    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
    }

    return ProductMapper.entityToDTO(product);

  }

  async getAllProducts(): Promise<ProductDTO[]> {
    const productsEntity: ProductEntity[] = await this.productPortOut.getAllProducts();
    return productsEntity.map(e => ProductMapper.entityToDTO(e));
  }

  async updateProduct(dto: SaveProductDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteProduct(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
