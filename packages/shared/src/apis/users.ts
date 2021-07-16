import strapiAxios, { useAction, useGet, API_HOST } from '@web/shared/apis';
import { IUseGetOptions } from '@web/shared/types/apis/index';

import { delay } from './../utils/index';

// 소셜 로그인
export const useProviderSignIn = () => {
  return useAction(async (provider, access_token) => {
    const res = await strapiAxios.get(`${API_HOST}/auth/${provider}/callback`, {
      params: {
        access_token,
      },
    });

    return res.data;
  });
};

// 로그인
export const useSignIn = () => {
  return useAction(async (identifier, password) => {
    const res = await strapiAxios.post(`${API_HOST}/auth/local`, {
      identifier,
      password,
    });

    return res.data;
  });
};

// 회원가입
export const useSignUp = () => {
  return useAction(async data => {
    const res = await strapiAxios.post(`${API_HOST}/auth/local/register`, data);

    return res.data;
  });
};

// 로그인 한 회원정보 가져오기
export const useGetMe = (options?: IUseGetOptions) => {
  return useGet('/users/me', options);
};
