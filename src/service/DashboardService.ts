import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { DashboardCashFlow, DashboardCount } from '@/types/api/dashboard';
import type { Loan } from '@/types/ui/loans';

const PATH = '/api/dashboard';
class ExpensesService {
  count(): AxiosPromise<DashboardCount> {
    return apiClient.get(`${PATH}/counts`);
  }

  cashFlow(params?: Record<string, any>): AxiosPromise<DashboardCashFlow[]> {
    return apiClient.get(`${PATH}/cash-flow`, { params });
  }

  recentLoans(): AxiosPromise<Loan[]> {
    return apiClient.get(`${PATH}/recent-loans`);
  }
}

export default new ExpensesService();
