import { Modal } from 'antd';
import { AxiosResponse } from 'axios';

import useAuth from '@web/shared/hooks/useAuth';
import { getErrorMessage } from '@web/shared/utils/strapi';

export default function useStrapiErrorAlert() {
  const { signOut } = useAuth();

  const handleErrorAlert = (error: AxiosResponse) => {
    // 에러가 없을 경우
    if (!error) {
      Modal.error({
        title: '요청 오류',
        content: '서버가 응답하지 않습니다',
      });
      return false;
    }

    // 상태 코드에 따른 코드 실행
    switch (error.status) {
      // 400: 잘못된 요청
      case 400: {
        // validation error
        if (error.data.message === 'ValidationError') {
          Modal.error({
            title: '요청 오류',
            content: '잘못된 요청입니다\n입력하신 값들이 올바른지 확인해주세요',
          });
          console.error(
            '[Strapi] ValidationError',
            error.data.data.errors,
            error,
          );
          break;
        }

        // bad request
        if (
          Array.isArray(error.data.message) &&
          Array.isArray(error.data.message[0].messages)
        ) {
          const errorItem = error.data.message[0].messages[0];
          Modal.error({
            title: '요청 오류',
            content: getErrorMessage(errorItem.id),
          });
          console.error('[Strapi] Bad Request', error);
          break;
        }

        // 읽을 수 없는 bad request
        Modal.error({
          title: '요청 오류',
          content: '잘못된 요청입니다',
        });
        console.error('[Strapi] Bad Request', error);
        break;
      }

      // 401: 인증오류
      case 401: {
        signOut();

        Modal.error({
          title: '요청 오류',
          content:
            '인증 정보가 올바르지 않습니다\n자동으로 로그아웃 처리됩니다',
        });
        break;
      }

      // 403: 접근 제한 오류 (권한 없음)
      case 403: {
        const token: string | null =
          window.localStorage.getItem('user.token') ||
          window.sessionStorage.getItem('user.token');

        Modal.error({
          title: '요청 오류',
          content: token ? '접근 권한이 없습니다' : '로그인 후 이용해주세요',
        });
        break;
      }

      // 404: 찾을 수 없음
      case 404: {
        Modal.error({
          title: '요청 오류',
          content: '요청하신 데이터를 찾을 수 없습니다',
        });
        break;
      }

      // 429: 많은 요청 오류
      case 429: {
        Modal.error({
          title: '요청 오류',
          content: '너무 많은 요청을 보냈습니다\n잠시 후 다시 시도해주세요',
        });
        break;
      }

      // 이외의 코드일 경우 알수 없는 오류
      default: {
        Modal.error({
          title: '요청 오류',
          content: '알수없는 오류가 발생했습니다',
        });
        console.log(error);
        break;
      }
    }
  };

  return { handleErrorAlert };
}
