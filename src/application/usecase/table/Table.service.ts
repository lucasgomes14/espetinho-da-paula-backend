import { Inject, Injectable } from '@nestjs/common';
import { TablePortIn } from '../../port/in/table/TablePortIn.js';
import type { TablePortOut } from '../../port/out/table/TablePortOut.js';
import { TABLE_PORT_OUT } from '../../port/out/table/TablePortOut.js';
import { TableResponseDTO } from '../../../framework/adapter/in/dto/table/TableResponseDTO.js';
import { TableMapper } from '../../../framework/adapter/in/mapper/table/TableMapper.js';
import { TableEntity } from '../../../domain/entity/table/TableEntity.js';

@Injectable()
export class TableService implements TablePortIn {
  constructor(
    @Inject(TABLE_PORT_OUT)
    private readonly tablePortOut: TablePortOut,
  ) {}

  async getAllTablesWithStatus(): Promise<TableResponseDTO[]> {
    const tableEntities: TableEntity[] =
      await this.tablePortOut.findAllTablesWithStatus();

    return tableEntities.map((entity) => TableMapper.entityToDTO(entity));
  }
}
