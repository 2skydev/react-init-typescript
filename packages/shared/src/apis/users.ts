import { SWRConfiguration } from 'swr';

import instanceAxios, {
  useAction,
  useGet,
  API_HOST,
} from '@web/shared/apis/index';

// 소셜 로그인
export const useProviderSignIn = () => {
  return useAction(async (provider, access_token) => {
    const res = await instanceAxios.get(
      `${API_HOST}/auth/${provider}/callback`,
      {
        params: {
          access_token,
        },
      },
    );

    return res.data;
  });
};

// 로그인
export const useSignIn = () => {
  return useAction(async (identifier, password) => {
    const res = await instanceAxios.post(`${API_HOST}/auth/local`, {
      identifier,
      password,
    });

    return res.data;
  });
};

// 회원가입
export const useSignUp = () => {
  return useAction(async data => {
    const res = await instanceAxios.post(
      `${API_HOST}/auth/local/register`,
      data,
    );

    return res.data;
  });
};

// 로그인 한 회원정보 가져오기
export const useGetMe = (options: SWRConfiguration) => {
  return useGet(
    '/users/me',
    async () => {
      const res = await instanceAxios.get(`${API_HOST}/users/me`);
      return res.data;
    },
    options,
  );
};
