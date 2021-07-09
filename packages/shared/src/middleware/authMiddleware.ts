import { delay } from '../utils';
import {
  IMiddlewareArguments,
  TMiddlewareReturn,
  TPromiseReturn,
} from './type';

export default async function authMiddleware(
  payload: any,
): Promise<TPromiseReturn> {
  try {
    await delay(2000);
    return {
      name: 'authMiddleware',
      success: true,
      payload: {},
    };
  } catch (e) {
    return {
      name: 'authMiddleware',
      success: false,
      payload: e,
    };
  }
}
