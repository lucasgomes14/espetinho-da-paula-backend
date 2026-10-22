import { TableEntity } from '../../../../domain/entity/table/TableEntity.js';

export const TABLE_PORT_OUT = 'TABLE_PORT_OUT';

export interface TablePortOut {
  findAllTablesWithStatus(): Promise<TableEntity[]>;
}
