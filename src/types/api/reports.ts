import type { Pagination } from '../ui';
import type { AccountTransaction } from '../ui/accounts';
import type { Loan } from '../ui/loans';
import type { Transaction } from '../ui/transactions';

export interface ReportCounterResponse {
  total_share_capital_amount?: number;
  total_savings_account_amount?: number;
  total_expenses_amount?: number;
  total_loan_released_amount?: number;

  total_collected_interest_amount?: number;
  total_collected_penalty_amount?: number;
  total_collected_amortization?: number;
  total_loans_collection?: number;

  total_all_fees: {
    amount?: number;
    name?: string;
  }[];
  total_sub_types: {
    amount?: number;
    name?: string;
  }[];

  all_time_total_loans_collection?: number;
  all_time_share_capital_total_amount?: number;
  all_time_total_loan_released_amount?: number;
  all_time_interest_loan_interest?: number;
  all_time_total_loans_collected?: number;
}

export interface CashFlowReport {
  month?: string;
  year?: number;
  flow: {
    revenue?: number;
    expenses?: number;
    share_capital?: number;
  };
}

export interface ShareCapitalsReportResponse extends Pagination {
  data: AccountTransaction[];
}

export interface RepaymentsReportResponse extends Pagination {
  data: AccountTransaction[];
}

export interface ExpensesReportResponse extends Pagination {
  data: Transaction[];
}

export interface LoanReleasedReportResponse extends Pagination {
  data: Loan[];
}

export interface SavingsTransactionsReportResponse extends Pagination {
  data: AccountTransaction[];
}

export interface ChartReleasedLoanResponse {
  name: string;
  count: number;
}

export interface ChartRevenueResponse {
  name: string;
  amount: number;
}
