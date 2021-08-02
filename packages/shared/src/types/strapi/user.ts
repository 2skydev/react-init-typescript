import { IRole } from './role';

/**
 * Model definition for user
 */
export interface IUser {
  id: number;
  username: string;
  email: string;
  provider?: string;
  password?: string;
  resetPasswordToken?: string;
  confirmationToken?: string;
  confirmed?: boolean;
  blocked?: boolean;
  role?: IRole;
  created_at: string;
  updated_at: string;
}
