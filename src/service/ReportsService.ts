import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { ReportCounterResponse } from '@/types/api/reports';

const PATH = '/api/reports';
class ReportsService {
  counter(params?: Record<string, any>): AxiosPromise<ReportCounterResponse> {
    return apiClient.get(`${PATH}/counter`, { params });
  }
}

export default new ReportsService();
