export interface LoanFeeForm {
  name?: string;
  fee?: number;
  fee_type?: string | null;
  fee_method?: string | null;
  enabled?: boolean;

  credit_revenue?: boolean;
  credit_share_capital?: boolean;
  credit_regular_savings?: boolean;
  show_to_report?: boolean;
}

export interface LoanFeeTemplate extends LoanFeeForm {
  id: number;
  created_at: string;
  updated_at: string;
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
