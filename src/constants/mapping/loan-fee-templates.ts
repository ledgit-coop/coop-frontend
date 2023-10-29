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
    show_to_report: loanFee.show_to_report,
    transaction_sub_type_id: loanFee.transaction_sub_type_id,
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
    show_to_report: fee.show_to_report,
    transaction_sub_type_id: fee.transaction_sub_type_id?.toString(),
  };
  return loanFeeForm;
}
