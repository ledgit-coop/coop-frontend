import { DATE_FORMAT } from '@/constants';
import type { DropdownOption } from '@/types/ui';
import moment from 'moment';

export const isEmptyText = (str?: string): boolean => !str || str.trim() === '' || str.replace(/ /g, '') === '';

export const dateFormat = (date: any, format: string = DATE_FORMAT) => {
  return moment(date).format(format);
};

export const formatCurrency = (value: number, placeholder: string = '--') => {
  return `Php ${formatNumber(value, placeholder)}`;
};

export const formatNumber = (value: number, placeholder: string = '--') => {
  return value == null || value == undefined
    ? placeholder
    : Number(value).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
};

export function generateYearListDropdown(): DropdownOption[] {
  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  const endYear = currentYear + 5;
  const yearList: DropdownOption[] = [];

  for (let year = endYear; year >= startYear; year--) {
    yearList.push({
      label: year.toString(),
      value: year.toString(),
    });
  }

  return yearList;
}
