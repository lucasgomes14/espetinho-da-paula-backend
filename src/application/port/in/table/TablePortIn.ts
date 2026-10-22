import { TableResponseDTO } from '../../../../framework/adapter/in/dto/table/TableResponseDTO.js';

export const TABLE_PORT_IN = "TABLE_PORT_IN";

export interface TablePortIn {
  getAllTablesWithStatus(): Promise<TableResponseDTO[]>;
}
