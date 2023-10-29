import type { Pagination } from '../ui';
import type { Transaction } from '../ui/transactions';

export interface IncomesListPayload {
  filters: any;
}

export interface IncomeListResponse extends Pagination {
  data: Transaction[];
}

export interface IncomeSavePayload {
  particular: string;
  amount?: number;
  date: string | null;
  transaction_sub_type_id?: number;
}
