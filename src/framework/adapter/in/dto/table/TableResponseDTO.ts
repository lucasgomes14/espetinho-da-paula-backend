import { ActiveOrderResponseDTO } from '../order/ActiveOrderResponseDTO.js';

export class TableResponseDTO {
  id: number;
  number: number;
  isOccupied: boolean;
  activeOrder?: ActiveOrderResponseDTO | null;
}
