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
}

export interface TransactionForm {
  particular?: string;
  transaction_date?: string | Date;
  amount?: number;
}
