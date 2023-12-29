import type { ListLoanRepaymentResponse, LoanRepaymentPayload } from '@/types/api/loan-repayments';
import type { LoanListPayload } from '@/types/api/loans';
import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';

const PATH = '/api/loan-repayments';
class LoanRepaymentService {
  list(params?: LoanListPayload): AxiosPromise<ListLoanRepaymentResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  store(schedule_id?: string, params?: LoanRepaymentPayload): AxiosPromise<ListLoanRepaymentResponse> {
    return apiClient.post(`${PATH}/${schedule_id}`, params);
  }

  collectionsExport(params?: LoanListPayload): AxiosPromise {
    return apiClient.get(`${PATH}/export/collections`, { params });
  }
}

export default new LoanRepaymentService();
