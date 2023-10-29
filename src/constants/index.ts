import type { DropdownOption } from '@/types/ui';

export * from './routes';

// API RESPONSE CODES
export const RESPONSE_UNAUTHORIZED = 401;
export const RESPONSE_NOT_FOUND = 404;
export const SERVICE_UNAVAILABLE = 503;

// Date format
export const DATE_FORMAT = 'MM/DD/yyyy';
export const DATE_TIME_FORMAT = 'MM/DD/yyyy h:m A';
export const DATE_FORMAT_DB = 'yyyy-MM-DD';
export const DATE_FORMAT_DATE = 'MMM D, Y';

export enum CivilStatus {
  Single = 'Single',
  Married = 'Married',
  Divorced = 'Divorced',
  Widowed = 'Widowed',
  Separated = 'Separated',
}

export const CivilStatusDropdown: DropdownOption[] = [
  { label: 'Single', value: CivilStatus.Single },
  { label: 'Married', value: CivilStatus.Married },
  { label: 'Divorced', value: CivilStatus.Divorced },
  { label: 'Widowed', value: CivilStatus.Widowed },
  { label: 'Separated', value: CivilStatus.Separated },
];
