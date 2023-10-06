import type { LoanFeeTemplate, LoanFeeTemplateForm } from './loan-fee-templates';
import type { LoanProduct } from './loan-products';
import type { Member, MemberAccount, MemberLoanSchedule } from './members';

export interface LoanType {
  name: string;
  id: string;
  interest_percentage_rate: number;
}

export interface Loan {
  id: number;
  member_id: number;
  loan_number?: string;
  loan_product_id: number;
  member_account_id: number;
  status: string;
  contact_number: string;
  age: number;
  email?: string;
  civil_status: string;
  present_address: string;
  home_address: string;
  valid_id: string;
  tin_number: string;
  number_of_children: number;
  application_type: string;
  employer_name: string;
  occupation: string;
  work_address: string;
  work_industry: string;
  loan_purpose: string;
  salary_range: string;
  applied_amount: number;
  principal_amount: number | null;
  disbursed_channel: string;
  interest_method: string;
  interest_type: string;
  loan_interest: number;
  loan_interest_period: string;
  loan_duration: number;
  loan_duration_type: string | null;
  repayment_cycle: string;
  number_of_repayments: number;
  repayment_mode: string | null;
  created_at: string;
  updated_at: string;
  released_date: string | null;
  next_payroll_date: string | null;
  applied_date?: string;
  guarantor_first_id?: string;
  guarantor_second_id?: string;
  loan_product?: LoanProduct;
  member?: Member;
  member_account?: MemberAccount;

  guarantor_first?: Member;
  guarantor_second?: Member;

  released?: boolean;
  loan_fees?: LoanFee[];

  released_amount?: number;
  interest_amount?: number;
  due_amount?: number;
  outstanding?: number;

  loan_schedules?: MemberLoanSchedule[];

  penalty: number | null;
  penalty_grace_period: number | null;
  penalty_method: string | null;
  penalty_duration: string | null;
  pre_termination_panalty?: number | null;
  pre_termination_panalty_method?: string | null;
  pre_termination_fee?: number | null;
}

export interface LoanForm {
  member_id?: string;
  contact_number?: string;
  age?: number;
  civil_status?: string;
  present_address?: string;
  home_address?: string;
  email?: string;
  valid_id?: string;
  tin_number?: string;
  number_of_children?: number;
  application_type?: string;
  employer_name?: string;
  occupation?: string;
  work_address?: string;
  loan_purpose?: string;
  salary_range?: string;
  work_industry?: string;
  member_account_id?: number;
  loan_product_id?: number;
  status?: string;
  applied_amount?: number | null;
  principal_amount?: number | null;
  applied_date?: string | Date;
  released_date?: string | Date;
  guarantor_first_id?: string;
  guarantor_second_id?: string;
  loan_term?: LoanTermForm;
  loan_fees?: LoanFee[];
}

export interface LoanTermForm {
  disbursed_channel?: string | null;
  interest_method?: string | null;
  interest_type?: string | null;
  loan_interest?: number | null;
  loan_interest_period?: string | null;
  loan_duration?: number | null;
  loan_duration_type?: string | null;
  repayment_cycle?: string | null;
  number_of_repayments?: number | null;
  repayment_mode?: string | null;

  penalty?: number | null;
  penalty_grace_period?: number | null;
  penalty_method?: string | null;
  penalty_duration?: string | null;

  pre_termination_panalty?: number | null;
  pre_termination_panalty_method?: string | null;

  next_payroll_date?: string | Date;
}

export interface LoanFee extends LoanFeeTemplateForm {
  amount?: number;
  loan_product_template?: LoanFeeTemplate;
  loan_fee_template?: LoanFeeTemplate;
}

export interface LoanSchedule {
  month: number;
  date: string;
  principal: number;
  interest: number;
  total_payment: number;
  loan_balance: number;
  description?: string;
}

export interface LoanCalculator {
  schedules?: LoanSchedule[];
  total_principal?: number;
  total_interest?: number;
  total_payment?: number;
  fees?: {
    name?: string;
    amount?: number;
  }[];
  released_amount?: number;
  amortization_starting_date?: string;
  maturity_date?: string;
  released_date?: string;
}

export interface LoanSummaryTable {
  released_date?: string;
  first_amortization_date?: string;
  maturity_date?: string;
  principal?: number;
  interest?: number;
  payment?: number;
  released_amount?: number;
  fees?: {
    name?: string;
    amount?: number;
  }[];
}
