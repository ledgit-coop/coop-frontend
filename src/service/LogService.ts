import apiClient from '@/http-common';
import type { ListLogResponse, LogListPayload, LogPayload } from '@/types/api/logs';
import type { Log } from '@/types/ui/logs';
import type { AxiosPromise } from 'axios';

const PATH = '/api/logs';

class LogService {
  index(params?: LogListPayload): AxiosPromise<ListLogResponse> {
    return apiClient.get(PATH, { params });
  }

  show(id: string): AxiosPromise<Log> {
    return apiClient.get(`${PATH}/${id}`);
  }

  destroy(id: string): AxiosPromise<Log> {
    return apiClient.delete(`${PATH}/${id}`);
  }

  post(params?: LogPayload): AxiosPromise<Log> {
    return apiClient.post(PATH, params);
  }

  patch(id: string, params?: LogPayload): AxiosPromise<Log> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }

  delete(id: string): AxiosPromise<Log> {
    return apiClient.delete(`${PATH}/${id}`);
  }
}

export default new LogService();
