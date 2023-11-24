import type { LoanFeeSavePayload } from '@/types/api/loan-fee-templates';
import type { LoanFeeForm, LoanFeeJSON, LoanFeeTemplate, LoanFeeTemplateForm } from '@/types/ui/loan-fee-templates';
import type { LoanProductFee } from '@/types/ui/loan-products';
import type { LoanFee } from '@/types/ui/loans';

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

export const mapLoanProductFeesToLoanFeeTemplate = (productFees: LoanProductFee[]): LoanFeeTemplateForm[] => {
  return productFees.map((fee) => ({
    loan_fee_template_id: fee.loan_fee_template_id,
    fee: fee.fee,
  }));
};

export const mapLoanFeeTemplate = (
  fees: LoanFeeTemplate[],
  hasSavings: boolean = false,
  hasShareCap: boolean = false
): LoanFeeJSON[] => {
  return fees.map(
    (f) =>
      ({
        fee_id: f.id,
        fee_name: f.name,
        fee_method: f.fee_method,
        fee_type: f.fee_type,
        value: (f.credit_regular_savings && !hasSavings) || (f.credit_share_capital && !hasShareCap) ? 0 : f.fee,
        credit_regular_savings: f.credit_regular_savings,
        credit_share_capital: f.credit_share_capital,
      } as LoanFeeJSON)
  );
};

export const loanFeeToFormTemplate = (loanFeeDb: LoanFeeJSON[], form: LoanFee[]): LoanFeeJSON[] => {
  return loanFeeDb.map((r) => {
    const f = form.find((t) => t.loan_fee_template_id === r.fee_id);

    return {
      ...r,
      ...(f ? { value: f.fee } : {}),
    };
  });
};
