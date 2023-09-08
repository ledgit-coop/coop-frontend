import type { MemberLoanTable } from '@/types/ui/members';
import type { AxiosPromise } from 'axios';
import axios from 'axios';

class LoanService {
  list(params?: Record<string, any>): AxiosPromise<MemberLoanTable[]> {
    return axios.get('/demo/data/loans.json', { params });
  }
}

export default new LoanService();
