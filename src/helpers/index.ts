import { DATE_FORMAT } from '@/constants';
import type { DropdownOption } from '@/types/ui';
import moment from 'moment';

export const isEmptyText = (str?: string): boolean => !str || str.trim() === '' || str.replace(/ /g, '') === '';

export const dateFormat = (date: any, format: string = DATE_FORMAT) => {
  const dt = moment(date);
  return dt.isValid() ? dt.format(format) : '--';
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

export function deepClone<T>(obj: T, cache = new WeakMap<object, T>()): T {
  // Check if the input is an object or an array
  if (typeof obj !== 'object' || obj === null) {
    return obj; // If it's not an object, return it as is (base case)
  }

  // If the object has already been cloned, return the cached clone
  if (cache.has(obj)) {
    return cache.get(obj)!;
  }

  // Create a new object or array based on the type of obj
  const clone = Array.isArray(obj) ? ([] as any) : ({} as any);

  // Cache the clone to handle circular references
  cache.set(obj, clone);

  // Iterate through the keys (or indices) of the object
  for (const [key, value] of Object.entries(obj)) {
    // Recursively deep clone each property and assign it to the clone
    clone[key] = deepClone(value, cache);
  }

  return clone; // Return the deep clone
}
