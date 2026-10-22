import { TableOrderItemDTO } from '../table/TableOrderItemDTO.js';

export class ActiveOrderResponseDTO {
  id: number;
  items: TableOrderItemDTO[];
  createdAt: Date;
}
