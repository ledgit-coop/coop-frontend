import type { LoanProduct } from './loan-products';
import type { Member, MemberAccount } from './members';

export interface LoanType {
  name: string;
  id: string;
  interest_percentage_rate: number;
}

export interface Loan {
  id: number;
  member_id: number;
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
  applied_amount: string;
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
  applied_date?: string;
  guarantor_first_id?: string;
  guarantor_second_id?: string;
  loan_product?: LoanProduct;
  member?: Member;
  member_account?: MemberAccount;

  guarantor_first?: LoanGuarantor;
  guarantor_second?: LoanGuarantor;

  released?: boolean;
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
  applied_date?: string;
  released_date?: string;
  guarantor_first_id?: string;
  guarantor_second_id?: string;
  loan_term?: LoanTermForm;
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
}

export interface LoanGuarantor {
  id: number;
  first_name: string;
  full_name?: string;
  middle_name?: string | null; // Marked as optional with `?`
  last_name: string;
  contact?: string | null; // Marked as optional with `?`
}
