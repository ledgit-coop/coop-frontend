export interface LoanGuarantor {
  id: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  contact?: string; // Optional field for confirmation
  created_at: Date;
}

export interface AuthLoanGuarantor extends LoanGuarantor {
  refreshToken: string;
}

export interface LoanGuarantorsTable extends LoanGuarantor {}

export interface LoanGuarantorSaveForm {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  contact?: string; // Optional field for confirmation
}
