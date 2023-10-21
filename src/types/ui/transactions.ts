import type { TransactionSubType } from './transaction-type';

export interface Transaction {
  id: number;
  particular: string;
  transaction_date: string;
  created_at: string;
  updated_at: string;
  transaction_number?: string;
  amount?: number;
  type?: string;
  parameters?: any;
  posted?: boolean;
  transaction_sub_type_id?: number;
  transaction_sub_type?: TransactionSubType;
}

export interface TransactionForm {
  particular?: string;
  transaction_date?: string | Date;
  amount?: number;
  transaction_sub_type_id?: number;
}
