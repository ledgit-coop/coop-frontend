export interface User {
  id: number;
  name: string;
  email: string;
  refreshToken: string;
  created_at: Date;
}

export interface AuthUser extends User {
  refreshToken: string;
}

export interface UsersTable extends User {}
