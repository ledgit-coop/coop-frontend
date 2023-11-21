import type { Pagination } from '../ui';
import type { NetSurplus } from '../ui/net-surplus';

export interface ListNetSurplusResponse extends Pagination {
  data: NetSurplus[];
}

export interface NetSurplusPayload {
  from_date?: string;
  to_date?: string;
}
