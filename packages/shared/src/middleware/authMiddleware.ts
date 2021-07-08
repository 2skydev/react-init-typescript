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
      success: true,
      payload: {},
    };
  } catch (e) {
    return {
      success: false,
      payload: e,
    };
  }
}
