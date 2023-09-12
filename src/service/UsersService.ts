import apiClient from '@/http-common';
import type { ListUserResponse } from '@/types/api/users';
import type { User } from '@/types/ui/user';
import type { AxiosPromise } from 'axios';

const PATH = '/api/users';
class UsersService {
  list(params?: Record<string, any>): AxiosPromise<ListUserResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  show(id: string): AxiosPromise<User> {
    return apiClient.get(`${PATH}/${id}`);
  }
}
1;
export default new UsersService();
