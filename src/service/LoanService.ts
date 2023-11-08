import type {
  ListLoanResponse,
  LoanApplicationPayload,
  LoanListPayload,
  UpdateLoanSchedulePayload,
} from '@/types/api/loans';
import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { Loan } from '@/types/ui/loans';
import type { MemberLoanStatus } from '@/constants/ui/members';
import type { MemberLoanSchedule } from '@/types/ui/members';

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

  updateStatus(id: string, status: MemberLoanStatus, params?: Record<string, any>): AxiosPromise<Loan> {
    return apiClient.post(`${PATH}/status/${id}`, { status, ...(params ?? {}) });
  }

  activeLoans(member_id?: string): AxiosPromise<Loan[]> {
    return apiClient.get(`${PATH}/active-loans/${member_id}`);
  }

  schedule(id: number): AxiosPromise<MemberLoanSchedule[]> {
    return apiClient.get(`${PATH}/schedule/${id}`);
  }

  destroy(id: number): AxiosPromise<Loan> {
    return apiClient.delete(`${PATH}/${id}`);
  }

  downloadLink(id: number, params: Record<string, any>): AxiosPromise {
    return apiClient.get(`${PATH}/download/${id}`, { params });
  }

  updateSchedule(schedule_id: number, payload: UpdateLoanSchedulePayload): AxiosPromise<MemberLoanSchedule> {
    return apiClient.post(`${PATH}/schedule/${schedule_id}`, payload);
  }
}

export default new LoanService();
