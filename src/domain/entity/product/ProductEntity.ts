import { CategoryEnum } from '../../enum/product/CategoryEnum.js';

export class ProductEntity {
  constructor(
    public readonly id: number,
    public name: string,
    public price: number,
    public isActive: boolean = true,
    public category: CategoryEnum,
    public readonly created: Date = new Date()
  ) {
    this.validate();
  }

  private validate() {
    if (this.price <= 0) {
      throw new Error("O preço do produto não pode ser menor ou igual a R$ 0,00.")
    }

    if (!this.name || this.name.trim().length === 0) {
      throw new Error("Nome do produto não pode está vazio.")
    }
  }

  updatePrice(newPrice: number) {
    if (!this.isActive) {
      throw new Error("Produto não está ativo.")
    }

    this.price = newPrice;
  }

  changeCategory(newCategory: CategoryEnum) {
    if (newCategory === this.category) {
      throw new Error("Categoria igual a anterior.")
    }

    this.category = newCategory;
  }

  changeName(newName: string) {
    if (newName === this.name) {
      throw new Error("Nome igual a anterior.")
    }

    this.name = newName;
  }

  deactivateProduct() {
    this.isActive = false;
  }
}
