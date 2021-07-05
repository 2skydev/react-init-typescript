import React from 'react';

import axios from 'axios';
import escapeStringRegexp from 'escape-string-regexp';
import useSWR, { Key, mutate } from 'swr';

import { dev, pro } from 'shared/config';
import {
  IAction,
  IActionState,
  IUseActionReturn,
  IUseGetReturn,
  TMethod,
} from 'shared/types/apis/index';

const isDev: boolean = process.env.NODE_ENV === 'development';
export const API_HOST_DEV: string = dev.api.host || window.location.host;
export const API_HOST_PRO: string = pro.api.host || window.location.host;
export const API_HOST: string = isDev ? API_HOST_DEV : API_HOST_PRO;

export const API_PATH_PREFIX_DEV: string = dev.api.prefix || '';
export const API_PATH_PREFIX_PRO: string = pro.api.prefix || '';
export const API_PATH_PREFIX: string = isDev
  ? API_PATH_PREFIX_DEV
  : API_PATH_PREFIX_PRO;

/*
 * axios 인스턴스 생성
 */
const instanceAxios = axios.create({
  baseURL: API_HOST + API_PATH_PREFIX,
  withCredentials: false,
});

/*
 * axios 요청 전 인터셉터
 */
instanceAxios.interceptors.request.use(
  config => {
    if (
      new RegExp(`^${escapeStringRegexp(API_HOST)}`).test(config.baseURL || '')
    ) {
      const token =
        window.localStorage['user.token'] ||
        window.sessionStorage['user.token'];

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

/*
 * axios 응답 전 인터셉터
 */
instanceAxios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => Promise.reject(error.response),
);

/*
 * useSWR 레퍼 함수
 */
export const useGet = (key: Key): IUseGetReturn => {
  const { data, error, isValidating, mutate: reload } = useSWR(key);
  const isLoading = data === undefined && isValidating;

  return {
    data,
    isLoading,
    isFetching: isValidating,
    error,
    reload,
  };
};

const actionInitState: IActionState = {
  status: 'idle',
  data: undefined,
  error: undefined,
};

const actionStateReducer = (
  state: IActionState,
  action: IAction,
): IActionState => {
  const { key, value } = action;

  switch (key) {
    case 'status': {
      state.status = value;
      break;
    }

    case 'actionBefore': {
      state.status = 'loading';
      state.data = undefined;
      state.error = undefined;
      break;
    }

    case 'actionAfter': {
      state.status = value.error ? 'error' : 'success';
      state.data = value.data || null;
      state.error = value.error || false;
      break;
    }
  }

  return state;
};

/*
 * react-query의 useMutation 함수와 같이 만든 함수
 */
export const useAction = (
  asyncFn: AsyncGeneratorFunction,
  mutateKeys: Key[] = [],
): IUseActionReturn => {
  const [state, dispatch] = React.useReducer(
    actionStateReducer,
    actionInitState,
  );

  const action = async (...data: any) => {
    dispatch({ key: 'actionBefore' });

    try {
      const res = await asyncFn(...data);

      for (const mutateKey of mutateKeys) {
        mutate(mutateKey);
      }

      dispatch({ key: 'actionAfter', value: { data: res } });
      return { data: res, error: false };
    } catch (err) {
      const error = err || true;
      dispatch({ key: 'actionAfter', value: { error } });
      return { data: null, error };
    }
  };

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    action,
  };
};

export const useActionAPI = (table: string, mutateKeys: Key[] = []) => {
  // return useAction(async () => {
  //   instanceAxios
  // }, )
};

export default instanceAxios;
