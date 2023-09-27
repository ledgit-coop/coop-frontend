import type { LoanProductFee } from '../ui/loan-products';
import type { Loan } from '../ui/loans';

export interface LoanApplicationPayload {
  member_account_id: number;
  member_id: number;
  loan_product_id: number;
  contact_number?: string | null;
  age?: number | null;
  civil_status?: string | null;
  present_address?: string | null;
  home_address?: string | null;
  valid_id?: string | null;
  tin_number?: string | null;
  number_of_children?: number | null;
  application_type?: string | null;
  employer_name?: string | null;
  occupation?: string | null;
  work_address?: string | null;
  loan_purpose?: string | null;
  applied_amount?: number | null;
  principal_amount?: number | null;
  disbursed_channel?: string | null;
  interest_method?: string | null;
  interest_type?: string | null;
  loan_interest?: number | null;
  loan_interest_period?: string | null;
  loan_duration?: number | null;
  repayment_cycle?: string | null;
  number_of_repayments?: number | null;
  repayment_mode?: string | null;
  salary_range?: string | null;
  work_industry?: string;
  applied_date?: string;
  released_date?: string;
  next_payroll_date?: string | null;
  loan_fees?: LoanProductFee[];

  penalty?: number | null;
  penalty_grace_period?: number | null;
  penalty_method?: string | null;
  penalty_duration?: string | null;

  pre_termination_panalty?: number | null;
  pre_termination_panalty_method?: string | null;
}

export interface LoanListPayload {
  filters?: any;
  member_id?: string;
}

export interface ListLoanResponse {
  data: Loan[];
}

export interface LoanCalculatorRequest {
  principal_amount?: number | null;
  loan_interest?: number | null;
  loan_duration?: number | null;
  interest_method?: string | null;
  number_of_repayments?: number | null;
  repayment_cycle?: string | null;
  loan_duration_type?: string | null;
  loan_interest_period?: string | null;
  released_date?: string | null;
  next_payroll_date?: string | null;

  fees: {
    loan_fee_template_id?: number;
    fee?: number;
  }[];
}
