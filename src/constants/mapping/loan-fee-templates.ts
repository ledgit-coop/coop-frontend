import type { LoanFeeSavePayload } from '@/types/api/loan-fee-templates';
import type { LoanFeeForm, LoanFeeTemplate } from '@/types/ui/loan-fee-templates';

export function mapLoanFeeToLoanFeeSavePayload(loanFee: LoanFeeForm): LoanFeeSavePayload {
  const feeSavePayload: LoanFeeSavePayload = {
    name: loanFee.name ?? '',
    fee: loanFee.fee ?? 0,
    fee_type: loanFee.fee_type ?? '',
    fee_method: loanFee.fee_method ?? '',
    enabled: loanFee.enabled ?? false,
    credit_regular_savings: loanFee.credit_regular_savings,
    credit_share_capital: loanFee.credit_share_capital,
    credit_revenue: loanFee.credit_revenue,
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
    credit_regular_savings: fee.credit_regular_savings,
    credit_share_capital: fee.credit_share_capital,
    credit_revenue: fee.credit_revenue,
  };
  return loanFeeForm;
}
