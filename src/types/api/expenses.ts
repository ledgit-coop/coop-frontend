import type { Pagination } from '../ui';
import type { Transaction } from '../ui/transactions';

export interface ExpensesListPayload {
  filters: any;
}

export interface ExpenseListResponse extends Pagination {
  data: Transaction[];
}

export interface ExpenseSavePayload {
  particular: string;
  amount?: number;
  date: string | null;
}
