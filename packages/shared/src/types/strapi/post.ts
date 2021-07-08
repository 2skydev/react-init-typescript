import { IUser } from './user';

/**
 * Model definition for post
 */
export interface IPost {
  id: string;
  title?: string;
  content?: string;
  user?: IUser;
  created_at: string;
  updated_at: string;
}
