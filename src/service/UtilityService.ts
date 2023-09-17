import type { AxiosPromise } from 'axios';
import apiClient from '@/http-common';
import type { DropdownOption, GuarantorDropdown } from '@/types/ui';
import type { AccountType } from '@/constants/ui/accounts';
import type { LoanCalculatorRequest } from '@/types/api/loans';
import type { LoanFeeTemplate } from '@/types/ui/loan-fee-templates';

const PATH = '/api/utility';
class UtilityService {
  getGuarantors(): AxiosPromise<GuarantorDropdown[]> {
    return apiClient.get(`${PATH}/guarantors/dropdown`);
  }

  getMemembersDropdown(): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/members/dropdown`);
  }

  getAccountDropdown(): AxiosPromise<DropdownOption[]> {
    return apiClient.get(`${PATH}/accounts/dropdown`);
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
}

export default new UtilityService();
