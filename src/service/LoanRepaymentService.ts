import type { MemberLoanTable } from '@/types/ui/members';
import type { AxiosPromise } from 'axios';
import axios from 'axios';

class LoanRepaymentService {
  list(params?: Record<string, any>): AxiosPromise<MemberLoanTable[]> {
    return axios.get('/demo/data/loans-repayment.json', { params });
  }
}

export default new LoanRepaymentService();
