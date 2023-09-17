import apiClient from '@/http-common';
import type { ListLoanGuarantorResponse, LoanGuarantorsSavePayload } from '@/types/api/loan-guarantors';
import type { LoanGuarantor } from '@/types/ui/loans';
import type { AxiosPromise } from 'axios';

const PATH = '/api/loan-guarantors';

class LoanGuarantorsService {
  list(params?: Record<string, any>): AxiosPromise<ListLoanGuarantorResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  store(params: LoanGuarantorsSavePayload): AxiosPromise<LoanGuarantor> {
    return apiClient.post(`${PATH}`, params);
  }

  show(id: number): AxiosPromise<LoanGuarantor> {
    return apiClient.get(`${PATH}/${id}`);
  }

  update(id: number, params: LoanGuarantorsSavePayload): AxiosPromise<LoanGuarantor> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }

  destroy(id: number): AxiosPromise {
    return apiClient.delete(`${PATH}/${id}`);
  }
}

export default new LoanGuarantorsService();
