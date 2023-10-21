import type { Pagination } from '../ui';
import type { TransactionSubType } from '../ui/transaction-type';

export interface ListTransactionSubTypeResponse extends Pagination {
  data: TransactionSubType[];
}

export interface TransactionSubTypePayload {
  key?: string;
  name?: string;
  type?: string; // Changed from enum to string
}
