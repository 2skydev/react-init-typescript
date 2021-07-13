import { useFormik } from 'formik';
import * as yup from 'yup';

import strapiAxios, { API_HOST } from '@web/shared/apis/index';
import { Form, Input } from '@web/shared/components/form/Form';

export const SignIn = () => {
  const isSignIn = Boolean(window.localStorage.getItem('user.token'));

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      signIn(values.email, values.password);
    },
    validationSchema: yup.object({
      email: yup.string().required('아이디를 입력해주세요'),
      password: yup.string().required('비밀번호를 입력해주세요'),
    }),
  });

  const signIn = async (identifier: string, password: string) => {
    const res = await strapiAxios.post(`${API_HOST}/auth/local`, {
      identifier,
      password,
    });

    if (!res.data.jwt) {
      alert('아이디 또는 비밀번호가 일치하지 않습니다');
      return false;
    }

    window.localStorage.setItem('user.token', res.data.jwt);
    window.localStorage.setItem('user.id', res.data.user.id);
    window.localStorage.setItem('user.role', res.data.user.role.type);

    alert('로그인이 완료되었습니다');
    window.location.reload();
  };

  const signOut = () => {
    window.localStorage.removeItem('user.token');
    window.localStorage.removeItem('user.id');
    window.localStorage.removeItem('user.role');

    alert('정상적으로 로그아웃 되었습니다');
    window.location.reload();
  };

  return (
    <div>
      {isSignIn && <button onClick={signOut}>로그아웃</button>}

      {!isSignIn && (
        <Form formik={formik}>
          <Input label="아이디" name="email" />

          <Input type="password" label="비밀번호" name="password" />

          <button>로그인</button>
        </Form>
      )}
    </div>
  );
};
