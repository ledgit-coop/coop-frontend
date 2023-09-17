import type { Pagination } from '../ui';
import type { LoanFee } from '../ui/loan-fee-templates';

export interface LoanFeeListPayload {
  filters: any;
}

export interface LoanFeeListResponse extends Pagination {
  data: LoanFee[];
}

export interface LoanFeeSavePayload {
  name: string;
  fee?: number;
  fee_type: string | null;
  fee_method: string | null;
  enabled?: boolean;
}
