export interface LoanProduct {
    id: number;
    name: string;
    percentage_against_share_capital: number | null;
    default_principal_amount: string;
    min_principal_amount: string;
    max_principal_amount: string;
    disbursed_channel: string;
    interest_method: string;
    interest_type: string;
    loan_interest_period: string;
    default_loan_interest: string;
    loan_duration_period: string;
    default_duration_period: string;
    repayment_cycle: string;
    default_number_of_repayments: number;
    created_at: string;
    updated_at: string;
  }