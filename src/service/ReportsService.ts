import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type {
  ChartReleasedLoanResponse,
  ChartRevenueResponse,
  ExpensesReportResponse,
  LoanReleasedReportResponse,
  MembersAllTimeReportResponse,
  MortuariesReportResponse,
  RepaymentsReportResponse,
  ReportCounterResponse,
  SavingsAccountReportResponse,
  SavingsTransactionsReportResponse,
  ShareCapitalsReportResponse,
} from '@/types/api/reports';

const PATH = '/api/reports';
class ReportsService {
  counter(params?: Record<string, any>): AxiosPromise<ReportCounterResponse> {
    return apiClient.get(`${PATH}/counter`, { params });
  }

  shareCapitals(params?: Record<string, any>): AxiosPromise<ShareCapitalsReportResponse> {
    return apiClient.get(`${PATH}/share-capitals`, { params });
  }

  mortuaryContributions(params?: Record<string, any>): AxiosPromise<MortuariesReportResponse> {
    return apiClient.get(`${PATH}/mortuaries`, { params });
  }

  expenses(params?: Record<string, any>): AxiosPromise<ExpensesReportResponse> {
    return apiClient.get(`${PATH}/expenses`, { params });
  }

  revenues(params?: Record<string, any>): AxiosPromise<ExpensesReportResponse> {
    return apiClient.get(`${PATH}/revenues`, { params });
  }

  loansReleased(params?: Record<string, any>): AxiosPromise<LoanReleasedReportResponse> {
    return apiClient.get(`${PATH}/loans-released`, { params });
  }

  loansRepayments(params?: Record<string, any>): AxiosPromise<RepaymentsReportResponse> {
    return apiClient.get(`${PATH}/loans-repayments`, { params });
  }

  savingsTransactions(params?: Record<string, any>): AxiosPromise<SavingsTransactionsReportResponse> {
    return apiClient.get(`${PATH}/savings-transactions`, { params });
  }

  chartsLoansReleased(params?: Record<string, any>): AxiosPromise<ChartReleasedLoanResponse[]> {
    return apiClient.get(`${PATH}/charts/loans-released`, { params });
  }

  chartsRevenue(params?: Record<string, any>): AxiosPromise<ChartRevenueResponse[]> {
    return apiClient.get(`${PATH}/charts/revenue`, { params });
  }

  members(params?: Record<string, any>): AxiosPromise<MembersAllTimeReportResponse> {
    return apiClient.get(`${PATH}/members`, { params });
  }
  savingsAccount(params?: Record<string, any>): AxiosPromise<SavingsAccountReportResponse> {
    return apiClient.get(`${PATH}/accounts/savings`, { params });
  }
}

export default new ReportsService();
