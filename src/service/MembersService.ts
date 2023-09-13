import apiClient from '@/http-common';
import type {
  GetAccountTransactionsParams,
  ListMemberResponse,
  PostAddMemberAccountTransactionPayload,
  PostMemberPayload,
} from '@/types/api/member';
import type { AccountTransaction } from '@/types/ui/accounts';
import type { Member } from '@/types/ui/members';
import type { AxiosPromise } from 'axios';

const PATH = '/api/members';
class MembersService {
  getMembers(params?: Record<string, any>): AxiosPromise<ListMemberResponse> {
    return apiClient.get('/api/members', { params });
  }

  show(id: string): AxiosPromise<Member> {
    return apiClient.get(`${PATH}/${id}`);
  }

  postMembers(params?: PostMemberPayload): AxiosPromise<Member> {
    return apiClient.post('/api/members', params);
  }

  postAddAccount(member_number: string, account_id: string): AxiosPromise {
    return apiClient.post(`${PATH}/accounts/add/${member_number}/${account_id}`);
  }

  postAttendedOrientation(member_number: string): AxiosPromise {
    return apiClient.post(`${PATH}/update/orientation/${member_number}`);
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

  getMembersShareCapitalTransactions(member_number: string) {
    console.log(member_number);
    return fetch('/demo/data/member-share-capital-transactions.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getMembersShareCapitalPatronageHistory(member_number: string) {
    console.log(member_number);
    return fetch('/demo/data/member-share-capital-dividen.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getMembersSavingsTransactionHistory(member_number: string) {
    console.log(member_number);
    return fetch('/demo/data/member-savings-transactions.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getMemberLoanHistory(member_number: string) {
    console.log(member_number);
    return fetch('/demo/data/member-loan-history.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getMemberLoanSchedule(loan_id: string) {
    console.log(loan_id);
    return fetch('/demo/data/loan-schedule.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }
}

export default new MembersService();
