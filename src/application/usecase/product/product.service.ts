import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductPortIn } from '../../port/in/product/ProductPortIn.js';
import { SaveProductDTO } from '../../../framework/adapter/in/dto/product/SaveProductDTO.js';
import { PRODUCT_PORT_OUT } from '../../port/out/product/ProductPortOut.js';
import type { ProductPortOut } from '../../port/out/product/ProductPortOut.js';
import { ProductDTO } from '../../../framework/adapter/in/dto/product/ProductDTO.js';
import { ProductMapper } from '../../../framework/adapter/in/mapper/ProductMapper.js';
import { ProductEntity } from '../../../domain/entity/product/ProductEntity.js';
import { UpdateProductDTO } from '../../../framework/adapter/in/dto/product/UpdateProductDTO.js';

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

  async updateProduct(id: number, dto: UpdateProductDTO): Promise<void> {
    const productEntity = await this.productPortOut.getProductById(id);

    if (!productEntity) {
      throw new NotFoundException('Produto não encontrado.');
    }

    if (dto.name !== productEntity.name) productEntity.changeName(dto.name);
    if (dto.price !== productEntity.price) productEntity.updatePrice(dto.price);
    if (dto.categoryId !== productEntity.categoryId) productEntity.changeCategory(dto.categoryId);

    if (dto.isActive === false) {
      productEntity.deactivateProduct();
    }

    await this.productPortOut.updateProduct(productEntity);
  }

  async deleteProduct(id: number): Promise<void> {
    const productEntity = await this.productPortOut.getProductById(id);

    if (!productEntity) {
      throw new NotFoundException('Produto não encontrado.');
    }

    await this.productPortOut.deleteProduct(productEntity);
  }
}
