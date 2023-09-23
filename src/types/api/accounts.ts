import type { Pagination } from '../ui';
import type { Account } from '../ui/accounts';

export interface ListAccountResponse extends Pagination {
  data: Account[];
}

export interface AccountSavePayload {
  key?: string;
  name?: string;
  type?: string; // Changed from enum to string
  earn_interest_per_anum?: number | null;
  maintaining_balance?: number | null;
  penalty_below_maintaining_method?: string | null; // Changed from enum to string
  penalty_below_maintaining?: number | null;
  penalty_below_maintaining_cycle?: string | null; // Changed from enum to string
  penalty_below_maintaining_duration?: number | null;
}
