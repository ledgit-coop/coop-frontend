import apiClient from '@/http-common';
import type { ListUserResponse, UserSavePayload } from '@/types/api/users';
import type { User } from '@/types/ui/user';
import type { AxiosPromise } from 'axios';

const PATH = '/api/users';
class UsersService {
  list(params?: Record<string, any>): AxiosPromise<ListUserResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  store(params: UserSavePayload): AxiosPromise<User> {
    return apiClient.post(`${PATH}`, params);
  }

  show(id: number): AxiosPromise<User> {
    return apiClient.get(`${PATH}/${id}`);
  }

  update(id: number, params: UserSavePayload): AxiosPromise<User> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }

  destroy(id: number): AxiosPromise {
    return apiClient.delete(`${PATH}/${id}`);
  }
}

export default new UsersService();
