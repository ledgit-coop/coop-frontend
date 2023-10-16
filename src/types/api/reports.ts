import type { Pagination } from '../ui';
import type { AccountTransaction } from '../ui/accounts';
import type { Loan } from '../ui/loans';
import type { Transaction } from '../ui/transactions';

export interface ReportCounterResponse {
  total_share_capital_amount?: number;
  total_savings_account_amount?: number;
  total_expenses_amount?: number;
  total_all_fees: {
    amount?: number;
    name?: string;
  }[];
  total_sub_types: {
    amount?: number;
    name?: string;
  }[];
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
