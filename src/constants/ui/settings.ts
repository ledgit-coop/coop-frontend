import type { SettingOption } from '@/types/ui/settings';

export const GENERAL_SETTINGS: SettingOption[] = [
  {
    key: 'general-coop-name',
    name: 'Cooperative Name',
  },
  {
    key: 'general-contact-number',
    name: 'Contact No.',
  },
  {
    key: 'general-email-address',
    name: 'Email Address',
  },
];

export const REVENUE_SETTINGS: SettingOption[] = [
  {
    key: 'allocation-reserve-fund',
    name: 'Allocation Reserve Fund %',
  },
  {
    key: 'educational-training-fund',
    name: 'Educational Training Fund %',
  },
  {
    key: 'optional-fund',
    name: 'Optional Fund %',
  },
  {
    key: 'remainder-patronage-refund',
    name: 'Remainder Patronage Refund %',
  },
  {
    key: 'remainder-interest-share-capital',
    name: 'Remainder Interest on Share Capital %',
  },
];
