import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { DashboardCount } from '@/types/api/dashboard';

const PATH = '/api/dashboard';
class ExpensesService {
  count(): AxiosPromise<DashboardCount> {
    return apiClient.get(`${PATH}/counts`);
  }
}

export default new ExpensesService();
