import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { TABLE_PORT_IN } from '../../../../../application/port/in/table/TablePortIn.js';
import type { TablePortIn } from '../../../../../application/port/in/table/TablePortIn.js';
import { TableResponseDTO } from '../../dto/table/TableResponseDTO.js';

@Controller('tables')
export class TableController {
  constructor(
    @Inject(TABLE_PORT_IN)
    private readonly tablePortIn: TablePortIn
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTables(): Promise<TableResponseDTO[]> {
    return await this.tablePortIn.getAllTablesWithStatus();
  }
}
