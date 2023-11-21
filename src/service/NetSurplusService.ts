import apiClient from '@/http-common';
import type { ListNetSurplusResponse, NetSurplusPayload } from '@/types/api/net-surplus';
import type { NetSurplus } from '@/types/ui/net-surplus';

import type { AxiosPromise } from 'axios';

const PATH = '/api/net-surplus';

class NetSurplusService {
  list(params?: Record<string, any>): AxiosPromise<ListNetSurplusResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  store(params: NetSurplusPayload): AxiosPromise<NetSurplus> {
    return apiClient.post(`${PATH}`, params);
  }

  show(id: number): AxiosPromise {
    return apiClient.get(`${PATH}/${id}`);
  }

  update(id: number, params: NetSurplusPayload): AxiosPromise<NetSurplus> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }

  destroy(id: number): AxiosPromise {
    return apiClient.delete(`${PATH}/${id}`);
  }
}

export default new NetSurplusService();
