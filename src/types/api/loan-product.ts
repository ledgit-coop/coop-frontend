import type { Pagination } from '../ui';
import type { LoanProduct, LoanProductFee } from '../ui/loan-products';

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
  default_number_of_repayments?: number | null;
  repayment_mode?: string | null;
  loan_product_fees?: LoanProductFee[];

  penalty?: number | null;
  penalty_grace_period?: number | null;
  penalty_method?: string | null;
  penalty_duration?: string | null;

  pre_termination_panalty?: number | null;
  pre_termination_panalty_method?: string | null;

  disbursement_transaction_sub_type_id: number | string;
  principal_transaction_sub_type_id: number | string;
  interest_transaction_sub_type_id: number | string;
  penalty_transaction_sub_type_id: number | string;
}
