import React from 'react';

import axios, { AxiosResponse } from 'axios';
import escapeStringRegexp from 'escape-string-regexp';
import qs from 'qs';
import useSWR, { Key, mutate } from 'swr';

import { dev, pro } from '@web/shared/config';
import sharedContext from '@web/shared/contexts/SharedContext';
import {
  IAction,
  IActionState,
  IUseActionReturn,
  IUseGetReturn,
  TMethod,
  IUseGetAPIOptions,
  IUseGetOptions,
} from '@web/shared/types/apis/index';
import { TCollection } from '@web/shared/types/strapi/collection';

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
const strapiAxios = axios.create({
  baseURL: API_HOST + API_PATH_PREFIX,
  withCredentials: false,
});

/*
 * axios 요청 전 인터셉터
 */
strapiAxios.interceptors.request.use(
  config => {
    if (
      new RegExp(`^${escapeStringRegexp(API_HOST)}`).test(config.baseURL || '')
    ) {
      const token =
        window.localStorage['token'] || window.sessionStorage['token'];

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

export const APIFetcher = async (url: string) => {
  try {
    const res = await strapiAxios.get(url);
    return res.data;
  } catch (error) {
    throw error.response;
  }
};

const keys = new Set();

/*
 * useSWR 레퍼 함수
 */
export const useGet = (
  key: Key,
  options: IUseGetOptions = {},
): IUseGetReturn => {
  let url = key as string;

  if (options.qs && Object.keys(options.qs as Record<string, unknown>).length) {
    url += `?${qs.stringify(options.qs)}`;
  }

  keys.add(url);

  const {
    data,
    error,
    isValidating,
    mutate: reload,
  } = useSWR(options.enabled === false ? null : url, APIFetcher, options);

  const isLoading = data === undefined && isValidating;

  return {
    data,
    isLoading,
    isFetching: isValidating || false,
    error,
    key: url as string,
    reload,
  };
};

/*
 * useSWR 레퍼 함수 + Strapi 관련 함수
 */
export const useGetAPI = (
  table: TCollection,
  options: IUseGetAPIOptions = {},
) => {
  let url = `/${table}`;

  if (options.id) {
    url += `/${options.id}`;
  } else if (options.count) {
    url += `/count`;
  }

  const returnValue = useGet(url, options);

  return returnValue;
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

  return {
    ...state,
  };
};

/*
 * 정규식으로 mutate
 */
export const regexMutate = (regex: RegExp) => {
  keys.forEach(key => {
    if (regex.test(key as string)) {
      mutate(key as string);
    }
  });
};

/*
 * react-query의 useMutation 함수와 같이 만든 함수
 */
export const useAction = (
  asyncFn: (...data: any) => Promise<any>,
  mutateKeys: any[] = [],
): IUseActionReturn => {
  const { onError } = React.useContext(sharedContext);
  const [state, dispatch] = React.useReducer(
    actionStateReducer,
    actionInitState,
  );

  const action = async (...data: any) => {
    dispatch({ key: 'actionBefore' });

    try {
      const res = await asyncFn(...data);

      for (const mutateKey of mutateKeys) {
        if (mutateKey instanceof RegExp) {
          regexMutate(mutateKey);
        } else {
          mutate(mutateKey);
        }
      }

      dispatch({ key: 'actionAfter', value: { data: res } });
      return res;
    } catch (err) {
      const error: AxiosResponse = err.response;
      dispatch({ key: 'actionAfter', value: { error } });
      onError && onError(error);
      throw error;
    }
  };

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    data: state.data,
    error: state.error,
    action,
  };
};

interface IUseActionAPIOptions {
  disableAutoMutation?: boolean;
  mutateKeys?: string[];
}

export const useActionAPI = (
  table: TCollection,
  options?: IUseActionAPIOptions,
) => {
  const [methodState, setMethodState] = React.useState<TMethod | null>(null);

  const { action: originAction, ...originStates } = useAction(
    async (method: TMethod, data: any, id?: number) => {
      const url = `/${table}${id === undefined ? '' : `/${id}`}`;
      const res = await strapiAxios[method](url, data);
      return res.data;
    },
    options?.disableAutoMutation || options?.mutateKeys
      ? options.mutateKeys || []
      : [new RegExp(`^\\/${table}(\\/.*)?(\\?.*)?`)],
  );

  const action = async (method: TMethod, data: any, id?: number) => {
    setMethodState(method);
    return await originAction(method, data, id);
  };

  return { ...originStates, method: methodState, action };
};

export default strapiAxios;
