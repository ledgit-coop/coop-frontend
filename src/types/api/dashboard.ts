export interface DashboardCount {
  shared_capital_total?: number;
  loan_released_count?: number;
  member_count?: number;
  overdue_loan_count?: number;
  new_registered_since_last_week?: number;
  shared_capital_current_month?: number;
  overdue_loans_current_month?: number;
  loan_released_current_month?: number;
}

export interface DashboardCashFlow {
  month?: string;
  year?: number;
  flow: {
    revenue?: number;
    expenses?: number;
    share_capital?: number;
  };
}
