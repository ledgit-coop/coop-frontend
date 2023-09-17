import type { Pagination } from '../ui';
import type { UsersTable } from '../ui/user';

export interface ListUserResponse extends Pagination {
  data: UsersTable[];
}

export interface UserSavePayload {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string; // Optional field for confirmation
}
