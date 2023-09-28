import type { Account, AccountTransaction } from './accounts';
import type { Loan } from './loans';

export interface MemberForm {
  surname?: string;
  first_name?: string;
  middle_name?: string | null;
  name_extension?: string | null;
  date_of_birth?: string | Date;
  place_of_birth?: string | null;
  date_hired?: string | Date;
  department?: string | null;
  position?: string | null;
  employee_no?: string | null;
  tin_no?: string | null;
  email_address?: string | null;
  member_at?: string;
  oriented?: boolean;
  gender?: string;
  telephone_number?: string;
  mobile_number?: string;
  beneficiaries?: MemberFormBeneficiary[];
  present_address?: MemberAddress;
  permanent_address?: MemberAddress;
  father: MemberRelatedPerson;
  mother: MemberRelatedPerson;
  spouse: MemberRelatedPerson;
  profile_picture_url?: string;
}

export interface Member extends MemberForm {
  id?: string;
  member_number?: string;
  full_name?: string;
  member_year?: string;
  age?: number;
  status?: string;
  oriented?: boolean;
  full_present_address?: string;
  full_permanent_address?: string;
  residency_status?: string;
  profile_picture_url?: string;
  share_capital: {
    id: number;
    balance: number;
    latest_transaction: AccountTransaction;
  };
  savings_accounts: MemberAccount[];
}

export interface MemberAddress {
  house_block_lot?: string;
  street?: string;
  subdivision_village?: string;
  barangay?: string;
  city_municipality?: string;
  province?: string;
  zip_code?: number;
  residency_status?: string;
}

export interface MemberRelatedPerson {
  surname?: string;
  first_name?: string;
  middle_name?: string;
  name_extension?: string;
  date_of_birth?: string | Date;
  occupation?: string;
  contact_number?: string;
  type?: string;
}

export interface MemberFormBeneficiary {
  name?: string;
  birthdate?: string | Date;
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
  last_deposit_date: string;
  last_deposit_amount: number;
  earn_interest_per_anum?: number;
}

export interface MembersTable {
  id?: string;
  member_number: string;
  full_name: string;
  email: string;
  status: string;
  gender: string;
  surname: string;
  first_name: string;
  middle_name: string;
  email_address: string;
  member_at: string;
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
  released_date: string;
}

export interface MemberLoanTable {
  id: string;
  loan_number: string;
  status: string;
  type: string;
  loan_date: string;
  loan_amount: string;
  interest_rate: string;
  outstanding_balance: string;
  due_every: string;
  member?: string;
  member_number?: string;
}

export interface MemberLoanSchedule {
  id: number;
  loan_id: number;
  due_date: string;
  principal_amount: number;
  interest_amount: number;
  fee_amount: number;
  penalty_amount: number;
  due_amount: number;
  principal_balance: number;
  is_maturity: number;
  paid: number;
  overdue: number;
  amount_paid: number | null;
  transaction_id: number | null;
  due_humans?: string;
  created_at: string;
  updated_at: string;
  almost_due?: boolean;
  loan?: Loan;
}

export interface MemberAccountTransactionForm {
  member_account_id?: string;
  transaction_type?: string;
  amount?: number;
  particular?: string;
  transaction_date?: string;
}

export interface MemberAccount {
  id: number;
  account_number: string;
  account_holder: string;
  member_id: number;
  account_id: number;
  status: string;
  passbook_count: number;
  balance: number;
  earn_interest_per_anum?: number | null;
  maintaining_balance?: number | null;
  penalty_below_maintaining_method?: string | null;
  penalty_below_maintaining?: number | null;
  penalty_below_maintaining_cycle?: string | null;
  penalty_below_maintaining_duration?: number | null;
  created_at: string;
  updated_at: string;
  latest_transaction?: AccountTransaction;
  account?: Account;
}
