import type { Pagination } from '../ui';
import type { LoanGuarantorsTable } from '../ui/loan-guarantors';

export interface ListLoanGuarantorResponse extends Pagination {
  data: LoanGuarantorsTable[];
}

export interface LoanGuarantorsSavePayload {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  contact?: string; // Optional field for confirmation
}
