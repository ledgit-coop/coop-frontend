import type { Loan } from '../ui/loans';

export interface LoanRepayment extends Loan {
  due_date?: string;
  has_overdue?: boolean;
}
export interface ListLoanRepaymentResponse {
  data: LoanRepayment[];
}

export interface LoanRepaymentPayload {
  amount_paid: number; // Required
  payment_remarks?: string | null; // Nullable string
  payment_reference?: string | null; // Nullable string
  payment_channel?: string | null; // Nullable string
  payment_date?: string | null;
}
