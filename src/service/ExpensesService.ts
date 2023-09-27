import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { ExpenseListResponse, ExpenseSavePayload, ExpensesListPayload } from '@/types/api/expenses';
import type { Transaction } from '@/types/ui/transactions';

const PATH = '/api/expenses';
class ExpensesService {
  list(params?: ExpensesListPayload): AxiosPromise<ExpenseListResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  store(params: ExpenseSavePayload): AxiosPromise<Transaction> {
    return apiClient.post(`${PATH}`, params);
  }

  show(id: number): AxiosPromise<Transaction> {
    return apiClient.get(`${PATH}/${id}`);
  }

  update(id: number, params: ExpenseSavePayload): AxiosPromise<Transaction> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }

  destroy(id: number): AxiosPromise {
    return apiClient.delete(`${PATH}/${id}`);
  }
}

export default new ExpensesService();
