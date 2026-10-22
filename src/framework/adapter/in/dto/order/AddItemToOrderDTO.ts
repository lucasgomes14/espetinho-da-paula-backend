import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDTO {
  @IsNumber()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class AddItemToOrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
