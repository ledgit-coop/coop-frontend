import type { AccountType } from '@/constants/ui/accounts';
import type { Pagination } from '@/types/ui';
import type { MembersTable } from '@/types/ui/members';

export interface PostMemberPayload {
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
  mobile_number?: string;
  telephone_number?: string;

  permanent_address?: {
    house_block_lot?: string;
    street?: string;
    subdivision_village?: string;
    barangay?: string;
    city_municipality?: string;
    province?: string;
    zip_code?: string;
  };

  present_address?: {
    house_block_lot?: string;
    street?: string;
    subdivision_village?: string;
    barangay?: string;
    city_municipality?: string;
    province?: string;
    zip_code?: string;
    residency_status?: string;
  };

  father?: PostMemberPerson;
  mother?: PostMemberPerson;
  spouse?: PostMemberPerson;

  beneficiaries: {
    name?: string;
    birthdate?: string;
    relationship?: string;
  }[];
}

export interface PostMemberPerson {
  surname?: string;
  first_name?: string;
  middle_name?: string;
  name_extension?: string;
  date_of_birth?: string;
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
}

export interface GetAccountTransactionsParams {
  member_account_id?: string;
  year?: string;
  type?: AccountType;
}
