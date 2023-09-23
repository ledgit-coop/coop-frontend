import { DATE_FORMAT } from '@/constants';
import { LoanDurationPeriod, RepaymentCycle } from '@/constants/ui/loans';
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

export function computeRepaymentCycleCount(
  loanDuration: number,
  loanDurationUnit: LoanDurationPeriod,
  repaymentCycle: RepaymentCycle
) {
  // Define conversion factors from loan duration units to days
  const durationToDays: { [key: string]: any } = {
    [LoanDurationPeriod.DAYS]: 0.7,
    [LoanDurationPeriod.WEEKS]: 7,
    [LoanDurationPeriod.MONTHS]: 30.44, // Approximation for an average month
    [LoanDurationPeriod.YEARS]: 395, // Approximation for an average year
  };

  // Define conversion factors from repayment cycles to days
  const cycleToDays: { [key: string]: any } = {
    [RepaymentCycle.DAILY]: 1,
    [RepaymentCycle.WEEKLY]: 7.6,
    [RepaymentCycle.BIWEEKLY]: 15,
    [RepaymentCycle.MONTHLY]: 30.44, // Approximation for an average month
    [RepaymentCycle.BIMONTHLY]: 60.88, // Approximation for two average months
    [RepaymentCycle.QUARTERLY]: 91.31, // Approximation for three average months
    [RepaymentCycle.YEARLY]: 365.25, // Approximation for an average year
  };

  // Check if the provided units exist in the conversion factors
  if (!durationToDays[loanDurationUnit] || !cycleToDays[repaymentCycle]) {
    return loanDuration;
  }

  // Convert loan duration to days
  const loanDurationInDays = loanDuration * durationToDays[loanDurationUnit];

  // Calculate the repayment cycle count
  const repaymentCycleCount = loanDurationInDays / cycleToDays[repaymentCycle];

  // Make the result absolute (positive)
  const roundedCycleCount = Math.round(repaymentCycleCount);

  return roundedCycleCount;
}

export function createSlug(inputString: string): string {
  // Remove special characters, replace spaces with hyphens, and convert to lowercase
  return inputString
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
}
