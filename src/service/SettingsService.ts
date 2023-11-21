import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { SettingsPayload } from '@/types/api/settings';
import type { Settings } from '@/types/ui/settings';

const PATH = '/api/settings';
class SettingsService {
  list(): AxiosPromise<Settings[]> {
    return apiClient.get(`${PATH}`);
  }

  store(params: SettingsPayload[]): AxiosPromise<Settings[]> {
    return apiClient.post(`${PATH}`, params);
  }
}

export default new SettingsService();
