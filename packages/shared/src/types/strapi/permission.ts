import { IRole } from './role';

/**
 * Model definition for permission
 */
export interface IPermission {
  id: number;
  type: string;
  controller: string;
  action: string;
  enabled: boolean;
  policy?: string;
  role?: IRole;
  created_at: string;
  updated_at: string;
}
