import type { ListLoanResponse, LoanApplicationPayload, LoanListPayload } from '@/types/api/loans';
import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { Loan } from '@/types/ui/loans';

const PATH = '/api/loans';
class LoanService {
  list(params?: LoanListPayload): AxiosPromise<ListLoanResponse> {
    return apiClient.get(`${PATH}`, { params });
  }

  postLoan(params: LoanApplicationPayload): AxiosPromise<Loan> {
    return apiClient.post(`${PATH}`, params);
  }

  show(id: number): AxiosPromise<Loan> {
    return apiClient.get(`${PATH}/${id}`);
  }

  update(id: number, params: LoanApplicationPayload): AxiosPromise<Loan> {
    return apiClient.patch(`${PATH}/${id}`, params);
  }
}

export default new LoanService();
