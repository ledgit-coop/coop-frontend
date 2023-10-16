import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type {
  ExpensesReportResponse,
  LoanReleasedReportResponse,
  RepaymentsReportResponse,
  ReportCounterResponse,
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
}

export default new ReportsService();
