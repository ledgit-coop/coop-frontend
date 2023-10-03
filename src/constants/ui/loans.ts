import type { DropdownOption } from '@/types/ui';

export enum RepaymentCycle {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  BIWEEKLY = 'biweekly',
  MONTHLY = 'monthly',
  BIMONTHLY = 'bimonthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
  LUMP_SUM = 'lump-sum',
}

export enum SalaryRange {
  '10K-Below' = '10K-Below',
  '11K-15K' = '11K-15K',
  '16K-22K' = '16K-22K',
  '23K-30K' = '23K-30K',
  '31K-40K' = '31K-40K',
  '41K-50K' = '41K-50K',
  '51K-60K' = '51K-60K',
  '60K-Above' = '60K-Above',
}

export enum LoanDisbursementChannel {
  CASH = 'cash',
  CHEQUE = 'cheque',
  BANK_TRANSFER = 'bank-transfer',
  E_WALLET_TRANSFER = 'e-wallet-transfer',
}

export enum LoanRepaymentMethodChannel {
  COLLECTIONS = 'collections',
  CASH = 'cash',
  CHEQUE = 'cheque',
  BANK_TRANSFER = 'bank-transfer',
  E_WALLET_TRANSFER = 'e-wallet-transfer',
}

export enum LoanInterestType {
  PERCENTAGE_BASE = 'percentage-base',
  FIX_AMOUNT_CYCLE = 'fix-amount-per-cycle',
}

export enum LoanInterestMethod {
  FLAT_RATE = 'flat-rate',
  REDUCING_BALANCE_EQUAL_INSTALLMENTS = 'reducing-bal-eq-installments',
  REDUCING_BALANCE_EQUAL_PRINCIPAL = 'reducing-bal-eq-principal',
}

export enum LoanDurationPeriod {
  DAYS = 'days',
  WEEKS = 'weeks',
  MONTHS = 'months',
  YEARS = 'years',
}

export enum LoanInterestPeriod {
  PER_DAY = 'per-day',
  PER_WEEK = 'per-week',
  PER_MONTH = 'per-month',
  PER_YEAR = 'per-year',
  PER_LOAN = 'per-loan',
}

export const REPAYMENT_CYCLE_DROPDOWN: DropdownOption[] = [
  { label: 'Daily', value: RepaymentCycle.DAILY },
  { label: 'Weekly', value: RepaymentCycle.WEEKLY },
  { label: 'Biweekly (Every 2 Weeks)', value: RepaymentCycle.BIWEEKLY },
  { label: 'Monthly', value: RepaymentCycle.MONTHLY },
  { label: 'Bimonthly (Every 2 Months)', value: RepaymentCycle.BIMONTHLY },
  { label: 'Quarterly', value: RepaymentCycle.QUARTERLY },
  { label: 'Yearly', value: RepaymentCycle.YEARLY },
  { label: 'Lump-Sum', value: RepaymentCycle.LUMP_SUM },
];

export enum LoanPenaltyMethod {
  PERCENTAGE = 'percentage',
  FIX_AMOUNT = 'fix-amount',
}

export enum LoanPenaltyFrequency {
  EVERY_DAY = 'every-day',
  EVERY_WEEK = 'every-week',
  EVERY_MONTH = 'every-month',
  EVERY_YEAR = 'every-year',
  EVERY_AMORTIZATION = 'every-amortization',
}
