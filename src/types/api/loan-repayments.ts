import type { MemberLoanSchedule } from '../ui/members';

export interface ListLoanRepaymentResponse {
  data: MemberLoanSchedule[];
}

export interface LoanRepaymentPayload {
  amount_paid: number; // Required
  payment_remarks?: string | null; // Nullable string
  payment_reference?: string | null; // Nullable string
  payment_channel?: string | null; // Nullable string
  payment_date?: string | null;
}
