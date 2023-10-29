import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { IncomeListResponse, IncomeSavePayload, IncomesListPayload } from '@/types/api/income';
import type { Transaction } from '@/types/ui/transactions';

const PATH = '/api/revenues';
class IncomeService {
  list(params?: IncomesListPayload): AxiosPromise<IncomeListResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  store(params: IncomeSavePayload): AxiosPromise<Transaction> {
    return apiClient.post(`${PATH}`, params);
  }

  show(id: number): AxiosPromise<Transaction> {
    return apiClient.get(`${PATH}/${id}`);
  }

  update(id: number, params: IncomeSavePayload): AxiosPromise<Transaction> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }

  destroy(id: number): AxiosPromise {
    return apiClient.delete(`${PATH}/${id}`);
  }
}

export default new IncomeService();
