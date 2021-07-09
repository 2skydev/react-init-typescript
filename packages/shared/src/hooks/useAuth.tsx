import { useSignIn, useSignUp } from '@web/shared/apis/users';
import { IAnyObject } from '@web/shared/types/etc';
import { createBody, getErrorMessage } from '@web/shared/utils/strapi';

export default function useAuth() {
  const { action: actionSignIn } = useSignIn();
  const { action: actionSignUp } = useSignUp();

  /*
   * 로그인 처리
   * - identifier: 로그인 할 계정 이메일 또는 사용자명
   * - password: 로그인 할 계정 비밀번호
   * - isSession: 세션 로그인 (탭 닫을시 로그아웃)
   *
   * 반환은 항상 객체로 반환 됩니다
   * 오류 확인은 객체안에 error를 확인하시면 됩니다
   *
   * 오류 메시지는 기본적으로 표시되니 변경을 원하시면 openAlert 함수 사용 부분을 수정하시면 됩니다
   */
  const signIn = async (
    identifier: string,
    password: string,
    isSession = false,
  ) => {
    const res = await actionSignIn(identifier, password);

    if (!res.error) {
      window[isSession ? 'sessionStorage' : 'localStorage'].setItem(
        'token',
        res.data.jwt,
      );

      return {
        error: false,
        data: res.data,
      };
    } else {
      return {
        error: true,
        messageID: res.messageID,
        message: getErrorMessage(res.messageID),
      };
    }
  };

  /*
   * 회원가입 처리
   * - data: 회원 정보 객체 (파일이 있을 경우에도 객체로 보내주세요)
   * - continueSignIn: 회원가입 끝나고 바로 로그인 처리
   *
   * 반환은 항상 객체로 반환 됩니다
   * 오류 확인은 객체안에 error를 확인하시면 됩니다
   *
   * 오류 메시지는 기본적으로 표시되니 변경을 원하시면 openAlert 함수 사용 부분을 수정하시면 됩니다
   */
  const signUp = async (data: IAnyObject, continueSignIn = false) => {
    const res = await actionSignUp(createBody(data));

    if (!res.error) {
      if (continueSignIn) {
        await signIn(data.email, data.password);
      }

      return {
        error: false,
        data: res.data,
      };
    } else {
      return {
        error: true,
        messageID: res.messageID,
        message: getErrorMessage(res.messageID),
      };
    }
  };

  /*
   * 로그아웃 처리
   */
  const signOut = async () => {
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('token');

    window.location.href = '/';
  };

  /*
   * 로그인 여부 확인
   */
  const isSignIn = () => {
    return Boolean(
      window.localStorage['token'] || window.sessionStorage['token'],
    );
  };

  return { signIn, signUp, signOut, isSignIn };
}
