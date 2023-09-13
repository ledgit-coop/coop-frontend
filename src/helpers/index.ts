import { DATE_FORMAT } from '@/constants';
import type { DropdownOption } from '@/types/ui';
import moment from 'moment';

export const isEmptyText = (str?: string) => !str || str.trim() === '';

export const dateFormat = (date: any, format: string = DATE_FORMAT) => {
  return moment(date).format(format);
};

export const formatCurrency = (value: number) => {
  return `Php ${value.toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export function generateYearListDropdown(): DropdownOption[] {
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 5;
  const startYear = 1990;
  const yearList: DropdownOption[] = [];

  for (let year = startYear; year <= endYear; year++) {
    yearList.push({
      label: year.toString(),
      value: year.toString(),
    });
  }

  return yearList;
}
