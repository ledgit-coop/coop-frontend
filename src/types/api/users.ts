import type { Pagination } from '../ui';
import type { UsersTable } from '../ui/user';

export interface ListUserResponse extends Pagination {
  data: UsersTable[];
}
