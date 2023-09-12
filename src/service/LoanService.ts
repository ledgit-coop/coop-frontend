import type { LoanApplicationPayload } from '@/types/api/loans';
import type { MemberLoanTable } from '@/types/ui/members';
import type { AxiosPromise } from 'axios';
import axios from 'axios';
import apiClient from '@/http-common';

const PATH = '/api/loans';
class LoanService {
  list(params?: Record<string, any>): AxiosPromise<MemberLoanTable[]> {
    return axios.get('/demo/data/loans.json', { params });
  }

  postLoan(params: LoanApplicationPayload): AxiosPromise {
    return apiClient.post(`${PATH}`, params);
  }
}

export default new LoanService();
