export interface InformationItem {
  label: string;
  value: string | string[];
}

export interface DropdownOption {
  label: string;
  value: any;
  disabled?: boolean;
  extra?: any;
}

export interface GuarantorDropdown extends DropdownOption {
  extra: {
    guarantor_twice: boolean;
  };
}

export interface CheckBoxOption {
  label: string;
  value: string;
}

export interface Pagination {
  current_page?: number;
  data: any;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  links?: {
    url?: string;
    label?: string;
    active?: boolean;
  }[];
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  to?: number;
  total?: number;
}
