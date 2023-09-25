import type { User } from './user';

export interface Log {
  id: number;
  model: string;
  model_id: number;
  type: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user?: User;
}
