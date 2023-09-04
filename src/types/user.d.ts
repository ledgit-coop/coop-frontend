import BaseModel from '@/types/api/BaseModel';
import type Division from '@/types/api/Division';
import type Designation from '@/types/api/Designation';
import type Agency from '@/types/api/Agency';
import type Profile from '@/types/api/Profile';
import type Role from './api/Role';

export interface UserProfile extends BaseModel {
  first_name: string;
  last_name: string;
}

export interface User extends BaseModel {
  refreshToken: string;
  id: number;
  email_address: string;
  agency_id: number;
  division_id: number;
  profile_id: number;
  role_id: number;
  user_status_id: number;
  full_name?: string;
  designation?: Designation;
  division?: Division;
  agency?: Agency;
  user_profile?: UserProfile;
  profile?: Profile;
  roles?: Role;
}
