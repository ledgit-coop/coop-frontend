import type { AccountTransactionType } from "@/constants/ui/accounts";

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

export interface Account {
  name: string;
  id: string;
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
}
