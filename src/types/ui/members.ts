export interface MemberForm {
  gender?: string;
  beneficiaries: MemberFormBeneficiary[];
}

export interface MemberFormBeneficiary {
  name?: string;
  birthdate?: string;
  relationship?: string;
}

export interface MemberLoanWidgetItem {
  type: string;
  balance: number;
  terms: number;
  paid: number;
  currency: string;
}

export interface MemberSavingsAccountWidgetItem {
  type: string;
  balance: number;
  currency: string;
  last_deposit_date: string;
  last_deposit_amount: number;
}

export interface MemberLoanApplication {
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
  loan_terms?: string;
  payment_mode?: string;
  payment_method?: string;
  loan_type?: string;
  loan_interest_rate?: number;
}

export interface MembersTable {
  id: string;
  name: string;
  email: string;
  status: string;
  gender: string;
  joined: string;
}

export interface MembersShareCapitalTransactions {
  id: string;
  reference_number: string;
  amount: string;
  particular: string;
  date: string;
}

export interface MembersShareCapitalPatronageHistory {
  id: string;
  reference_number: string;
  amount: string;
  percentage: string;
  year: string;
  recorded_share_capital: string;
  release_date: string;
}

export interface MemberAccountTransactionHistory {
  id: string;
  transaction_number: string;
  account: string;
  withdrawals: string;
  deposits: string;
  date: string;
  running_balance: string;
}
export interface MemberLoanHistory {
  id: string;
  loan_number: string;
  status: string;
  type: string;
  loan_date: string;
  loan_amount: string;
  interest_rate: string;
  outstanding_balance: string;
}
