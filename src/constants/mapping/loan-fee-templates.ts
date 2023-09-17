import type { LoanFeeSavePayload } from '@/types/api/loan-fee-templates';
import type { LoanFeeForm, LoanFeeTemplate } from '@/types/ui/loan-fee-templates';

export function mapLoanFeeToLoanFeeSavePayload(loanFee: LoanFeeForm): LoanFeeSavePayload {
  const feeSavePayload: LoanFeeSavePayload = {
    name: loanFee.name ?? '',
    fee: loanFee.fee ?? 0,
    fee_type: loanFee.fee_type ?? '',
    fee_method: loanFee.fee_method ?? '',
    enabled: loanFee.enabled ?? false,
  };

  return feeSavePayload;
}

export function mapLoanFeeSavePayloadToLoanFee(fee: LoanFeeTemplate): LoanFeeForm {
  const loanFeeForm: LoanFeeForm = {
    name: fee.name,
    fee: fee.fee,
    fee_type: fee.fee_type,
    fee_method: fee.fee_method,
    enabled: fee.enabled ?? false,
  };
  return loanFeeForm;
}
