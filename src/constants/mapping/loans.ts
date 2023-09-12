import type { LoanApplicationPayload } from '@/types/api/loans';
import type { LoanForm, LoanTermForm } from '@/types/ui/loans';

export function mapLoanFormToPayload(loanForm: LoanForm): LoanApplicationPayload {
  const {
    member_id,
    contact_number,
    age,
    civil_status,
    present_address,
    home_address,
    valid_id,
    tin_number,
    number_of_children,
    application_type,
    employer_name,
    occupation,
    work_address,
    loan_purpose,
    applied_amount,
    loan_term,
    ...rest // Extract other properties
  } = loanForm;

  const loanTerm: LoanTermForm = {
    disbursed_channel: loan_term?.disbursed_channel || null,
    interest_method: loan_term?.interest_method || null,
    interest_type: loan_term?.interest_type || null,
    loan_interest: loan_term?.loan_interest || null,
    loan_interest_period: loan_term?.loan_interest_period || null,
    loan_duration: loan_term?.loan_duration || null,
    loan_duration_type: loan_term?.loan_duration_type || null,
    repayment_cycle: loan_term?.repayment_cycle || null,
    number_of_repayments: loan_term?.number_of_repayments || null,
    repayment_mode: loan_term?.repayment_mode || null,
  };

  return {
    member_account_id: loanForm.member_account_id || 0,
    member_id: Number(member_id || 0),
    loan_product_id: loanForm.loan_product_id || 0,
    contact_number: contact_number || null,
    age: age || null,
    civil_status: civil_status || null,
    present_address: present_address || null,
    home_address: home_address || null,
    valid_id: valid_id || null,
    tin_number: tin_number || null,
    number_of_children: number_of_children || null,
    application_type: application_type || null,
    employer_name: employer_name || null,
    occupation: occupation || null,
    work_address: work_address || null,
    loan_purpose: loan_purpose || null,
    applied_amount: applied_amount || null,
    ...loanTerm,
    ...rest, // Spread other properties
  };
}
