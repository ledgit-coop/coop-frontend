import type { DropdownOption } from '@/types/ui';

export enum MemberType {
  PERMANENT = 'permanent',
  PRESENT = 'present',
}
export enum MemberStatus {
  ACTIVE = 'active',
  TERMINATED = 'terminated',
}

export const MEMBER_STATUSES: DropdownOption[] = [
  { label: 'Active', value: MemberStatus.ACTIVE },
  { label: 'Terminated', value: MemberStatus.TERMINATED },
];

export const MEMBER_OTHER_FILTER: DropdownOption[] = [
  { label: 'Not Paid Membership', value: 'not-paid-membership' },
  { label: 'Not Attended Orientation', value: 'not-attended-orientation' },
  { label: 'Already Paid Membership', value: 'already-paid-membership' },
  { label: 'Already Attended Orientation', value: 'already-attended-orientation' },
];

export enum MemberLoanStatus {
  EVAULUATION = 'evaluation',
  PRE_APPROVED = 'pre-approved',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CLOSED = 'closed',
  OVERDUE = 'overdue',
  RELEASED = 'released',
  REQUEST_PRE_TERMINATION = 'request-pre-termination',
  PRE_TERMINATED = 'pre-terminated',
  DRAFT = 'draft',
}

export const MemberLoanStatusDropdowns: DropdownOption[] = [
  { label: 'Pending', value: MemberLoanStatus.PENDING },
  { label: 'Evaluation', value: MemberLoanStatus.EVAULUATION },
  { label: 'Pre-Approved', value: MemberLoanStatus.PRE_APPROVED },
  { label: 'Approved', value: MemberLoanStatus.APPROVED },
  { label: 'Rejected', value: MemberLoanStatus.REJECTED },
  { label: 'Released', value: MemberLoanStatus.RELEASED },
  { label: 'Closed', value: MemberLoanStatus.CLOSED },
];
