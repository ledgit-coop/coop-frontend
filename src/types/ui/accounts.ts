import type { AccountTransactionType } from '@/constants/ui/accounts';

export interface AccountTransactionHistory {
  id: string;
  transaction_number: string;
  particular: string;
  type: string;
  withdrawals: string;
  deposits: string;
  date: string;
  running_balance: string;
}

export interface AccountSaveForm {
  name?: string;
  type?: string; // Changed from enum to string
  earn_interest_per_anum?: number | null;
  maintaining_balance?: number | null;
  penalty_below_maintaining_method?: string | null; // Changed from enum to string
  penalty_below_maintaining?: number | null;
  penalty_below_maintaining_cycle?: string | null; // Changed from enum to string
  penalty_below_maintaining_duration?: number | null;
}

export interface Account extends AccountSaveForm {
  id: number;
  key: string;
  created_at: string; // Timestamp in ISO 8601 format
  updated_at: string; // Timestamp in ISO 8601 format
}

export interface AccountTransaction {
  amount?: number;
  created_at?: string;
  deleted_at?: string;
  id?: string;
  member_account_id?: string;
  particular?: string;
  transaction_date?: string;
  updated_at?: string;
  transaction_type?: AccountTransactionType;
  account_name?: string;
  remaining_balance?: number;
  posted?: boolean;
}
