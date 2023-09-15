import type { ProductSavePayload } from '@/types/api/loan-product';
import type { LoanProduct, LoanProductForm } from '@/types/ui/loan-products';
import type { LoanTermForm } from '@/types/ui/loans';

export function mapLoanProductToProductSavePayload(loanProduct: LoanProductForm): ProductSavePayload {
  const productSavePayload: ProductSavePayload = {
    name: loanProduct.name || null,
    default_principal_amount: loanProduct.default_principal_amount || null,
    min_principal_amount: loanProduct.min_principal_amount || null,
    max_principal_amount: loanProduct.max_principal_amount || null,
    disbursed_channel: loanProduct.loan_term?.disbursed_channel || null,
    interest_method: loanProduct.loan_term?.interest_method || null,
    interest_type: loanProduct.loan_term?.interest_type || null,
    loan_interest_period: loanProduct.loan_term?.loan_interest_period || null,
    default_loan_interest: loanProduct.loan_term?.loan_interest || null,
    default_loan_duration: loanProduct.loan_term?.loan_duration || null,
    loan_duration_type: loanProduct.loan_term?.loan_duration_type || null,
    repayment_cycle: loanProduct.loan_term?.repayment_cycle || null,
    number_of_repayments: loanProduct.loan_term?.number_of_repayments || null,
  };

  return productSavePayload;
}

export function mapProductSavePayloadToLoanProduct(productSavePayload: ProductSavePayload): LoanProductForm {
  const loanTermForm: LoanTermForm = {
    disbursed_channel: productSavePayload.disbursed_channel || null,
    interest_method: productSavePayload.interest_method || null,
    interest_type: productSavePayload.interest_type || null,
    loan_interest: productSavePayload.default_loan_interest || null,
    loan_interest_period: productSavePayload.loan_interest_period || null,
    loan_duration: productSavePayload.default_loan_duration || null,
    loan_duration_type: productSavePayload.loan_duration_type || null,
    repayment_cycle: productSavePayload.repayment_cycle || null,
    number_of_repayments: productSavePayload.number_of_repayments || null,
  };

  const loanProductForm: LoanProductForm = {
    name: productSavePayload.name ?? '',
    default_principal_amount: productSavePayload.default_principal_amount || null,
    min_principal_amount: productSavePayload.min_principal_amount || null,
    max_principal_amount: productSavePayload.max_principal_amount || null,
    loan_term: loanTermForm,
  };

  return loanProductForm;
}

export function mapLoanProductToTerms(product: LoanProduct): LoanTermForm {
  return {
    interest_method: product.interest_method,
    disbursed_channel: product.disbursed_channel,
    interest_type: product.interest_type,
    loan_interest_period: product.loan_interest_period,
    repayment_cycle: product.repayment_cycle,
    loan_duration: product.default_loan_duration,
    loan_interest: product.default_loan_interest,
    number_of_repayments: product.default_number_of_repayments,
    loan_duration_type: product.loan_duration_type,
    repayment_mode: product.repayment_cycle,
  };
}
