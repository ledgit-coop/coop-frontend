export enum MemberType {
  'permanent',
  'present',
}

export interface MemberForm {
  beneficiaries: MemberFormBeneficiary[];
}

export interface MemberFormBeneficiary {
  name?: string;
  birthdate?: string;
  relationship?: string;
}

export interface MemberLoanWidgetItem {
  type: string;
  balance: number;
  terms: number;
  paid: number;
  currency: string;
}
