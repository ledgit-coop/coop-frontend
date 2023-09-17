import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { LoanFeeListPayload, LoanFeeListResponse, LoanFeeSavePayload } from '@/types/api/loan-fee-templates';
import type { LoanFeeTemplate } from '@/types/ui/loan-fee-templates';

const PATH = '/api/loan-fees';
class LoanFeeTemplateService {
  list(params?: LoanFeeListPayload): AxiosPromise<LoanFeeListResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  store(params: LoanFeeSavePayload): AxiosPromise<LoanFeeTemplate> {
    return apiClient.post(`${PATH}`, params);
  }

  show(id: number): AxiosPromise<LoanFeeTemplate> {
    return apiClient.get(`${PATH}/${id}`);
  }

  update(id: number, params: LoanFeeSavePayload): AxiosPromise<LoanFeeTemplate> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }

  destroy(id: number): AxiosPromise {
    return apiClient.delete(`${PATH}/${id}`);
  }

  toggle(id: number): AxiosPromise<LoanFeeTemplate> {
    return apiClient.post(`${PATH}/${id}/toggle`);
  }
}

export default new LoanFeeTemplateService();
