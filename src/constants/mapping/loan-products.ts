import type { ProductSavePayload } from '@/types/api/loan-product';
import type { LoanProduct, LoanProductForm } from '@/types/ui/loan-products';
import type { LoanTermForm } from '@/types/ui/loans';

export function mapLoanProductToProductSavePayload(loanProduct: LoanProductForm): ProductSavePayload {
  const productSavePayload: ProductSavePayload = {
    name: loanProduct.name,
    default_principal_amount: loanProduct.default_principal_amount,
    min_principal_amount: loanProduct.min_principal_amount,
    max_principal_amount: loanProduct.max_principal_amount,
    disbursed_channel: loanProduct.loan_term?.disbursed_channel,
    interest_method: loanProduct.loan_term?.interest_method,
    interest_type: loanProduct.loan_term?.interest_type,
    loan_interest_period: loanProduct.loan_term?.loan_interest_period,
    default_loan_interest: loanProduct.loan_term?.loan_interest,
    default_loan_duration: loanProduct.loan_term?.loan_duration,
    loan_duration_type: loanProduct.loan_term?.loan_duration_type,
    repayment_cycle: loanProduct.loan_term?.repayment_cycle,
    default_number_of_repayments: loanProduct.loan_term?.number_of_repayments,
    repayment_mode: loanProduct.loan_term?.repayment_mode,
    loan_product_fees: loanProduct.loan_product_fees ?? [],

    penalty: loanProduct.loan_term?.penalty,
    penalty_grace_period: loanProduct.loan_term?.penalty_grace_period,
    penalty_method: loanProduct.loan_term?.penalty_method,
    penalty_duration: loanProduct.loan_term?.penalty_duration,

    pre_termination_panalty: loanProduct.loan_term?.pre_termination_panalty,
    pre_termination_panalty_method: loanProduct.loan_term?.pre_termination_panalty_method,
  };

  return productSavePayload;
}

export function mapProductSavePayloadToLoanProduct(productSavePayload: ProductSavePayload): LoanProductForm {
  const loanTermForm: LoanTermForm = {
    disbursed_channel: productSavePayload.disbursed_channel,
    interest_method: productSavePayload.interest_method,
    interest_type: productSavePayload.interest_type,
    loan_interest: productSavePayload.default_loan_interest,
    loan_interest_period: productSavePayload.loan_interest_period,
    loan_duration: productSavePayload.default_loan_duration,
    loan_duration_type: productSavePayload.loan_duration_type,
    repayment_cycle: productSavePayload.repayment_cycle,
    number_of_repayments: productSavePayload.default_number_of_repayments,
    repayment_mode: productSavePayload.repayment_mode,

    penalty: productSavePayload.penalty,
    penalty_grace_period: productSavePayload.penalty_grace_period,
    penalty_method: productSavePayload.penalty_method,
    penalty_duration: productSavePayload.penalty_duration,

    pre_termination_panalty: productSavePayload.pre_termination_panalty,
    pre_termination_panalty_method: productSavePayload.pre_termination_panalty_method,
  };
  const loanProductForm: LoanProductForm = {
    name: productSavePayload.name ?? '',
    default_principal_amount: productSavePayload.default_principal_amount,
    min_principal_amount: productSavePayload.min_principal_amount,
    max_principal_amount: productSavePayload.max_principal_amount,
    loan_term: loanTermForm,
    loan_product_fees: productSavePayload.loan_product_fees ?? [],
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
    repayment_mode: product.repayment_mode,

    penalty: product.penalty,
    penalty_grace_period: product.penalty_grace_period,
    penalty_method: product.penalty_method,
    penalty_duration: product.penalty_duration,

    pre_termination_panalty: product.pre_termination_panalty,
    pre_termination_panalty_method: product.pre_termination_panalty_method,
  };
}
