import type { Pagination } from '../ui';
import type { LoanProduct } from '../ui/loan-products';

export interface LoanProductListPayload {
  filters: any;
}

export interface LoanProductListResponse extends Pagination {
  data: LoanProduct[];
}

export interface ProductSavePayload {
  name?: string | null;
  default_principal_amount?: number | null;
  min_principal_amount?: number | null;
  max_principal_amount?: number | null;
  disbursed_channel?: string | null;
  interest_method?: string | null;
  interest_type?: string | null;
  loan_interest_period?: string | null;
  default_loan_interest?: number | null;
  default_loan_duration?: number | null;
  loan_duration_type?: string | null;
  repayment_cycle?: string | null;
  number_of_repayments?: number | null;
}
