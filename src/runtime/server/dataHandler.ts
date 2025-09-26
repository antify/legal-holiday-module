import type {
  CachedLegalHolidays,
} from './types';

export type DataHandler = {
  findData(year: number): Promise<CachedLegalHolidays | null>;
  saveData(data: CachedLegalHolidays): Promise<CachedLegalHolidays | null>;
};

export const defineDataHandler = (dataHandler: DataHandler): DataHandler => dataHandler;
