export class CreateOrderDTO {
  tableId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}
