import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { DropdownOption, GuarantorDropdown } from '@/types/ui';
import type { AccountType } from '@/constants/ui/accounts';
import type { LoanCalculatorRequest } from '@/types/api/loans';
import type { LoanFeeTemplate } from '@/types/ui/loan-fee-templates';
import type { TransactionSubType } from '@/types/ui/transaction-type';

const PATH = '/api/utility';
class UtilityService {
  getGuarantors(params: Record<string, any>): AxiosPromise<GuarantorDropdown[]> {
    return apiClient.get(`${PATH}/guarantors/dropdown`, { params });
  }

  getMemembersDropdown(): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/members/dropdown`);
  }

  getAccountDropdown(params?: { restrict_member_id?: string }): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/accounts/dropdown`, { params });
  }

  getWorkIndustriesDropdown(): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/work-industries/dropdown`);
  }

  getmemberAcountDropdown(member_id: string, params?: { type: AccountType }): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/accounts/members/dropdown/${member_id}`, { params });
  }

  getLoanProducts(): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/loan-products/dropdown`);
  }

  loanCalculator(params: LoanCalculatorRequest): AxiosPromise {
    return apiClient.get(`${PATH}/loan-calculator`, { params });
  }

  getLoanFees(): AxiosPromise<LoanFeeTemplate[]> {
    return apiClient.get(`${PATH}/loan-fee-templates`);
  }

  getMemberAccountHoldersDropdown(member_id: string): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/members/${member_id}/account-holders/dropdown`);
  }

  getTransactionSubTypeExpenses(): AxiosPromise<TransactionSubType[]> {
    return apiClient.get(`${PATH}/transaction-sub-types/expenses`);
  }
}

export default new UtilityService();
