import type { LoanTermForm } from './loans';

export interface MemberForm {
  surname?: string;
  first_name?: string;
  middle_name?: string | null;
  name_extension?: string | null;
  date_of_birth?: string | null;
  place_of_birth?: string | null;
  date_hired?: string | null;
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
  beneficiaries: MemberFormBeneficiary[];
  present_address?: MemberAddress;
  permanent_address?: MemberAddress;
  father: MemberRelatedPerson;
  mother: MemberRelatedPerson;
  spouse: MemberRelatedPerson;
}

export interface Member extends MemberForm {
  id?: string;
  member_number?: string;
  full_name?: string;
  member_year?: string;
  age?: number;
  oriented?: boolean;
  full_present_address?: string;
  full_permanent_address?: string;
}

export interface MemberAddress {
  house_block_lot?: string;
  street?: string;
  subdivision_village?: string;
  barangay?: string;
  city_municipality?: string;
  province?: string;
  zip_code?: string;
  residency_status?: string;
}

export interface MemberRelatedPerson {
  surname?: string;
  first_name?: string;
  middle_name?: string;
  name_extension?: string;
  date_of_birth?: string;
  occupation?: string;
  contact_number?: string;
  type?: string;
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

export interface MembersTable {
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
  release_date: string;
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
  due_date: string;
  amount_due: string;
  late_fees: string;
  amount_paid: string;
}

export interface MemberAccountTransactionForm {
  member_account_id?: string;
  transaction_type?: string;
  amount?: number;
  particular?: string;
}
