import type { Pagination } from '../ui';
import type { LoanFeeTemplate } from '../ui/loan-fee-templates';

export interface LoanFeeListPayload {
  filters: any;
}

export interface LoanFeeListResponse extends Pagination {
  data: LoanFeeTemplate[];
}

export interface LoanFeeSavePayload {
  name: string;
  fee?: number;
  fee_type: string | null;
  fee_method: string | null;
  enabled?: boolean;
}
