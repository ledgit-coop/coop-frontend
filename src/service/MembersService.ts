import type { MemberStatus } from '@/constants/ui/members';
import apiClient from '@/http-common';
import type {
  GetAccountTransactionsParams,
  ListMemberResponse,
  PostAddMemberAccountTransactionPayload,
  PostMemberPayload,
} from '@/types/api/member';
import type { AccountTransaction } from '@/types/ui/accounts';
import type { Member, MemberAccount } from '@/types/ui/members';
import type { AxiosPromise } from 'axios';

const PATH = '/api/members';
class MembersService {
  getMembers(params?: Record<string, any>): AxiosPromise<ListMemberResponse> {
    return apiClient.get('/api/members', { params });
  }

  show(id: string): AxiosPromise<Member> {
    return apiClient.get(`${PATH}/${id}`);
  }

  destroy(id: string): AxiosPromise<Member> {
    return apiClient.delete(`${PATH}/${id}`);
  }

  postMembers(params?: PostMemberPayload): AxiosPromise<Member> {
    return apiClient.post('/api/members', params);
  }

  patchMembers(id: string, params?: PostMemberPayload): AxiosPromise<Member> {
    return apiClient.patch(`/api/members/${id}`, params);
  }

  postAttendedOrientation(member_id: string): AxiosPromise {
    return apiClient.post(`${PATH}/update/orientation/${member_id}`);
  }

  postAddAccount(member_id: string, account_id: string, account_holder: string): AxiosPromise {
    return apiClient.post(`${PATH}/accounts/add/${member_id}/${account_id}`, { account_holder });
  }

  updateStatus(member_id: string, status: MemberStatus): AxiosPromise {
    return apiClient.post(`${PATH}/accounts/status/${member_id}`, { status });
  }

  getAccounts(member_id: number, params?: Record<string, any>): AxiosPromise<MemberAccount[]> {
    return apiClient.get(`${PATH}/accounts/${member_id}}`, { params });
  }

  deleteAccount(member_account_id: number): AxiosPromise<MemberAccount[]> {
    return apiClient.delete(`${PATH}/accounts/${member_account_id}}`);
  }

  postAddAccountTransaction(member_account_id: string, params: PostAddMemberAccountTransactionPayload): AxiosPromise {
    return apiClient.post(`${PATH}/accounts/transaction/${member_account_id}`, params);
  }

  getMemberAccountTrasactions(
    member_id: string,
    params?: GetAccountTransactionsParams
  ): AxiosPromise<AccountTransaction[]> {
    return apiClient.get(`${PATH}/accounts/transaction/${member_id}`, { params });
  }

  getMemberLoanSchedule(loan_id: string) {
    console.log(loan_id);
    return fetch('/demo/data/loan-schedule.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }
}

export default new MembersService();
