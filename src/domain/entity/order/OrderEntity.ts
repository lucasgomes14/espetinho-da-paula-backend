export enum OrderStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  CANCELED = 'CANCELED',
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  delivered?: boolean; // Permite rastrear a entrega individual do item
}

export class OrderEntity {
  constructor(
    public readonly id: number,
    public readonly tableId: number,
    public status: OrderStatus = OrderStatus.OPEN,
    public items: OrderItem[] = [],
    public readonly createdAt: Date = new Date(),
  ) {}

  addItem(productId: number, productName: string, quantity: number, price: number) {
    if (this.status !== OrderStatus.OPEN) {
      throw new Error("Não é possível adicionar itens a uma comanda fechada ou cancelada.");
    }

    if (quantity <= 0) {
      throw new Error("A quantidade do item deve ser maior que zero.");
    }

    const existingItem = this.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ productId, productName, quantity, price, delivered: false });
    }
  }

  // --- NOVO MÉTODO DE DOMÍNIO ---
  updateItemStatus(productName: string, delivered: boolean): void {
    const item = this.items.find(
      (i) => i.productName.trim().toLowerCase() === productName.trim().toLowerCase()
    );

    if (item) {
      item.delivered = delivered;
    }
  }

  closeOrder() {
    if (this.status !== OrderStatus.OPEN) {
      throw new Error("Esta comanda já está fechada ou foi cancelada.");
    }
    this.status = OrderStatus.CLOSED;
  }

  cancelOrder() {
    this.status = OrderStatus.CANCELED;
  }
}
