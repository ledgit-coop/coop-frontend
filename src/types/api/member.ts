import type { AccountType } from '@/constants/ui/accounts';
import type { Pagination } from '@/types/ui';
import type { MemberAccount, MembersTable } from '@/types/ui/members';
import type { Log } from '../ui/logs';
import type { Loan } from '../ui/loans';

export interface PostMemberPayload {
  member_number?: string;
  surname: string;
  first_name: string;
  middle_name?: string;
  name_extension?: string;
  date_of_birth?: string; // Assuming a date string format
  place_of_birth?: string;
  gender?: string;
  date_hired?: string; // Assuming a date string format
  department?: string;
  position?: string;
  employee_no?: string;
  tin_no?: string;
  email_address?: string;
  member_at: string; // Assuming a date string format
  oriented?: boolean;

  paid_membership?: boolean;
  record_membership_payment?: boolean;
  record_orientation_fee?: boolean;
  orientation_date?: string;
  membership_fee_amount?: number;
  orientation_fee_amount?: number;

  mobile_number?: string;
  telephone_number?: string;
  profile_picture_url?: string;

  in_case_emergency_person?: string;
  in_case_emergency_address?: string;
  in_case_emergency_contact?: string;
  civil_status?: string;

  permanent_address?: {
    house_block_lot?: string;
    street?: string;
    subdivision_village?: string;
    barangay?: string;
    city_municipality?: string;
    province?: string;
    zip_code?: number;
  };

  present_address?: {
    house_block_lot?: string;
    street?: string;
    subdivision_village?: string;
    barangay?: string;
    city_municipality?: string;
    province?: string;
    zip_code?: number;
    residency_status?: string;
  };

  father?: PostMemberPerson;
  mother?: PostMemberPerson;
  spouse?: PostMemberPerson;

  beneficiaries: {
    name?: string;
    birthdate?: string | null;
    relationship?: string;
  }[];
}

export interface PostMemberPerson {
  surname?: string;
  first_name?: string;
  middle_name?: string;
  name_extension?: string;
  date_of_birth?: string | null;
  occupation?: string;
  contact_number?: string;
  type?: string;
}

export interface ListMemberResponse extends Pagination {
  data: MembersTable[];
}

export interface PostAddMemberAccountTransactionPayload {
  transaction_type?: string;
  amount?: number;
  particular?: string;
  transaction_date?: string;
  member_account_id?: string;
}

export interface GetAccountTransactionsParams {
  member_account_id?: string;
  year?: string;
  type?: AccountType;
}

export interface GetMemberOverview {
  recent_activities: Log[];
  active_loans: { amount?: number; name: string; interest?: number; period?: string }[];
  pending_loans: {
    status?: string;
    amount?: number;
    name: string;
    interest?: number;
    period?: string;
    applied_date?: string;
  }[];
  savings_accounts?: MemberAccount[];
  gaurantee_loans?: Loan[];
}
