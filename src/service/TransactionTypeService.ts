import apiClient from '@/http-common';
import type { ListTransactionSubTypeResponse, TransactionSubTypePayload } from '@/types/api/transaction-types';
import type { TransactionSubType } from '@/types/ui/transaction-type';
import type { AxiosPromise } from 'axios';

const PATH = '/api/transaction-types';

class TransactionTypeService {
  list(params?: Record<string, any>): AxiosPromise<ListTransactionSubTypeResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  store(params: TransactionSubTypePayload): AxiosPromise<TransactionSubType> {
    return apiClient.post(`${PATH}`, params);
  }

  show(id: number): AxiosPromise<TransactionSubType> {
    return apiClient.get(`${PATH}/${id}`);
  }

  update(id: number, params: TransactionSubTypePayload): AxiosPromise<TransactionSubType> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }

  destroy(id: number): AxiosPromise {
    return apiClient.delete(`${PATH}/${id}`);
  }
}

export default new TransactionTypeService();
