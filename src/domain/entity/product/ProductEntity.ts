export class ProductEntity {
  constructor(
    public readonly id: number,
    public name: string,
    public price: number,
    public isActive: boolean = true,
    public readonly created: Date = new Date(),
    public categoryId: number,
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

    if (newPrice <= 0) {
      throw new Error("O preço do produto não pode ser menor ou igual a R$ 0,00.");
    }

    this.price = newPrice;
  }

  changeCategory(newCategoryId: number) {
    if (newCategoryId === this.categoryId) {
      throw new Error("Categoria igual a anterior.");
    }

    this.categoryId = newCategoryId;
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
