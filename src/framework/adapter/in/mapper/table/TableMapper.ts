import { TableEntity } from '../../../../../domain/entity/table/TableEntity.js';
import { TableResponseDTO } from '../../dto/table/TableResponseDTO.js';

export class TableMapper {
  static entityToDTO(entity: TableEntity): TableResponseDTO {
    return {
      id: entity.id,
      number: entity.number,
      isOccupied: entity.isOccupied,
      activeOrder: entity.activeOrder ? {
        id: entity.activeOrder.id,
        items: entity.activeOrder.items,
        createdAt: entity.activeOrder.createdAt,
      } : null,
    };
  }
}
