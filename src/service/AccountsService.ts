import apiClient from '@/http-common';
import type { ListAccountResponse, AccountSavePayload } from '@/types/api/accounts';
import type { Account } from '@/types/ui/accounts';
import type { AxiosPromise } from 'axios';

const PATH = '/api/accounts';

class AccountsService {
  list(params?: Record<string, any>): AxiosPromise<ListAccountResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  store(params: AccountSavePayload): AxiosPromise<Account> {
    return apiClient.post(`${PATH}`, params);
  }

  show(id: number): AxiosPromise<Account> {
    return apiClient.get(`${PATH}/${id}`);
  }

  update(id: number, params: AccountSavePayload): AxiosPromise<Account> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }

  destroy(id: number): AxiosPromise {
    return apiClient.delete(`${PATH}/${id}`);
  }
}

export default new AccountsService();
