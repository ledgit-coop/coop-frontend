import type { TransactionSubType } from './transaction-type';

export interface LoanFeeForm {
  name?: string;
  fee?: number;
  fee_type?: string | null;
  fee_method?: string | null;
  enabled?: boolean;

  credit_revenue?: boolean;
  credit_share_capital?: boolean;
  credit_regular_savings?: boolean;
  credit_mortuary?: boolean;

  show_to_report?: boolean;

  transaction_sub_type_id?: string;
}

export interface LoanFeeTemplate extends LoanFeeForm {
  id: number;
  created_at: string;
  updated_at: string;
  transaction_sub_type?: TransactionSubType;
}

export interface LoanFeeJSON {
  fee_id: number;
  value?: number;
  fee_name: string;
  fee_type?: string | null;
  fee_method?: string | null;
  credit_regular_savings?: boolean;
  credit_share_capital?: boolean;
}

export interface LoanFeeTemplateForm {
  loan_fee_template_id?: number;
  fee?: number;
}
