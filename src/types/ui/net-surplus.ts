export interface NetSurplus {
  id: number;
  to_date: string;
  from_date: string;
  interest_income_on_loan: number;
  service_fees: number;
  membership_fees: number;
  gross_surplus: number;
  operating_expenses: number;
  net_suprplus_allocation_distribution: number;
  reserve_fund_percent: number;
  reserve_fund: number;
  educational_training_fund_percent: number;
  educational_training_fund: number;
  educational_training_fund_due_cetf: number;
  educational_training_fund_due_etf: number;
  optional_fund_percent: number;
  optional_fund: number;
  interest_on_share_capital: number;
  patronage_refund: number;
  net_surplus_allocated_distributed: number;
  interest_on_share_capital_rate_interest: number;
  patronage_refund_rate_interest: number;
  created_by: number; // Assuming foreign key is a number representing User ID
  created_at: string; // Timestamps
  updated_at: string;
}

export interface NetSurplusSaveForm {
  from_date?: string;
  to_date?: string; // Changed from enum to string
}
