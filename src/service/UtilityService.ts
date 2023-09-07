import type { ComakersResponse } from '@/types/api/utility';
import type { AxiosPromise } from 'axios';
import axios from 'axios';

class UtilityService {
  getCoMakers(params?: Record<string, any>): AxiosPromise<ComakersResponse[]> {
    return axios.get('/demo/data/comakers.json', { params });
  }
}

export default new UtilityService();
