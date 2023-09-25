import type { Pagination } from '../ui';
import type { Log } from '../ui/logs';

export interface ListLogResponse extends Pagination {
  data: Log[];
}

export interface LogListPayload {
  module: string;
  module_id: string;
  [key: string]: any;
}

export interface LogPayload {
  module: string;
  module_id: string;
  type: string;
  content: string;

  parent_module?: string;
  parent_module_id?: string;
}
