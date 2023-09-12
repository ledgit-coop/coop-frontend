export interface LoanType {
  name: string;
  id: string;
  interest_percentage_rate: number;
}

export interface Loan {
  name: string;
  id: string;
  interest_percentage_rate: number;
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
  comaker_first?: string;
  comaker_second?: string;
  salary_range?: string;
  work_industry?: string;
  member_account_id?: number;
  loan_product_id?: number;
  status?: string;
  applied_amount?: number | null;
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
