export interface TableActiveOrder {
  id: number;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }[];
  createdAt: Date;
}

export class TableEntity {
  constructor(
    public readonly id: number,
    public readonly number: number,
    public isOccupied: boolean = false,
    public activeOrder?: TableActiveOrder | null,
  ) {
    this.validate();
  }

  private validate() {
    if (this.number <= 0) {
      throw new Error("O número da mesa deve ser maior que zero.");
    }
  }

  occupy(order: TableActiveOrder) {
    this.isOccupied = true;
    this.activeOrder = order;
  }

  free() {
    this.isOccupied = false;
    this.activeOrder = null;
  }
}
