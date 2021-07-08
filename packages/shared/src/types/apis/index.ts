import { MutatorCallback } from 'swr/dist/types';

// useGet types
export interface IUseGetReturn {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  reload: (
    data?: any | Promise<any> | MutatorCallback<any>,
    shouldRevalidate?: boolean,
  ) => Promise<any | undefined>;
}

// useAction types
export type TMethod = 'get' | 'post' | 'put' | 'delete';
export type TActionKey = 'status' | 'actionBefore' | 'actionAfter';

export interface IActionState {
  status: 'idle' | 'loading' | 'error' | 'success';
  data: any;
  error: any;
}

export interface IAction {
  key: TActionKey;
  value?: any;
}

export interface IUseActionReturn {
  isIdle: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: any;
  error: any;
  action: (...data: any) => Promise<any>;
}
