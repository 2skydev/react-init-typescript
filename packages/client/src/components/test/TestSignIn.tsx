import { Button, Space } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Form, Input } from '@web/shared/components/form/Form';
import useAuth from '@web/shared/hooks/useAuth';

import { useRootSelector } from '~/hooks/useRootSelector';

export default function TestSignIn() {
  const { isSignIn, signIn, signOut } = useAuth();
  const user = useRootSelector(state => state.shared.auth.user);

  const _signIn = async (id: string, pw: string) => {
    await signIn(id, pw);
    window.location.reload();
  };

  const _signOut = async () => {
    await signOut();
    window.location.reload();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      _signIn(values.email, values.password);
    },
    validationSchema: yup.object({
      email: yup.string().required('아이디를 입력해주세요'),
      password: yup.string().required('비밀번호를 입력해주세요'),
    }),
  });

  return (
    <div>
      {isSignIn && (
        <pre>
          sign info (redux: state.shared.auth.user)
          <br />
          {JSON.stringify(user, null, 2)}
        </pre>
      )}

      {isSignIn && (
        <Button type="primary" danger onClick={_signOut}>
          sign out
        </Button>
      )}

      {!isSignIn && (
        <Form formik={formik}>
          <Space direction="vertical" size="middle">
            <Input label="id" name="email" />
            <Input type="password" label="password" name="password" />

            <Button type="primary" htmlType="submit" color="primary" block>
              sign in
            </Button>
          </Space>
        </Form>
      )}
    </div>
  );
}
