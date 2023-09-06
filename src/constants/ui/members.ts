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
