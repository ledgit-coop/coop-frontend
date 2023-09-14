import type { ComakersResponse } from '@/types/api/utility';
import type { AxiosPromise } from 'axios';
import axios from 'axios';
import apiClient from '@/http-common';
import type { DropdownOption } from '@/types/ui';
import type { AccountType } from '@/constants/ui/accounts';

const PATH = '/api/utility';
class UtilityService {
  getCoMakers(params?: Record<string, any>): AxiosPromise<ComakersResponse[]> {
    return axios.get('/demo/data/comakers.json', { params });
  }

  getMemembersDropdown(): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/members-dropdown`);
  }

  getAccountDropdown(): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/accounts/dropdown`);
  }

  getWorkIndustriesDropdown(): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/work-industries/dropdown`);
  }

  getmemberAcountDropdown(member_id: string, params?: { type: AccountType }): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/accounts/members/dropdown/${member_id}`, { params });
  }

  getLoanProducts(): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/loan-products/dropdown`);
  }
}

export default new UtilityService();
