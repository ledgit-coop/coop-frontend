import type { LoanFeeTemplate, LoanFeeTemplateForm } from './loan-fee-templates';
import type { LoanTermForm } from './loans';

export interface LoanProductForm {
  name?: string;
  default_principal_amount?: number | null;
  min_principal_amount?: number | null;
  max_principal_amount?: number | null;
  loan_term?: LoanTermForm;
  loan_product_fees?: LoanProductFee[];
}

export interface LoanProduct {
  id: number;
  name: string;
  locked?: boolean;
  default_principal_amount: number | null;
  min_principal_amount: number | null;
  max_principal_amount: number | null;
  disbursed_channel: string | null;
  interest_method: string | null;
  interest_type: string | null;
  loan_interest_period: string | null;
  default_loan_interest: number | null;
  loan_duration_type: string | null;
  default_loan_duration: number | null;
  repayment_cycle: string | null;
  default_number_of_repayments: number | null;
  repayment_mode: string | null;
  created_at: string;
  updated_at: string;
  loan_product_fees?: LoanProductFee[];

  penalty: number | null;
  penalty_grace_period: number | null;
  penalty_method: string | null;
  penalty_duration: string | null;

  pre_termination_panalty?: number | null;
  pre_termination_panalty_method?: string | null;
}

export interface LoanProductFee extends LoanFeeTemplateForm {
  loan_product_template?: LoanFeeTemplate;
}
