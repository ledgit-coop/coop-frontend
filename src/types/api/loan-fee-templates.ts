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
  credit_revenue?: boolean;
  credit_share_capital?: boolean;
  credit_regular_savings?: boolean;
  show_to_report?: boolean;
  transaction_sub_type_id?: string;
}
