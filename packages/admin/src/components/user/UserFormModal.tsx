import React from 'react';

import { Space } from 'antd';
import { useFormik } from 'formik';
import styled from 'styled-components';
import * as yup from 'yup';

import { useGetAPI, useActionAPI, regexMutate } from '@web/shared/apis';
import { Input, Form, Radio } from '@web/shared/components/form/Form';
import useAuth from '@web/shared/hooks/useAuth';
import { IAnyObject } from '@web/shared/types/etc';
import { getQS } from '@web/shared/utils';

import FormModal from '~/components/form/FormModal';
import FormSection from '~/components/form/FormSection';
import useFormModal from '~/hooks/useFormModal';

const UserFormModalContent = styled.div`
  .ant-radio-group {
    display: flex;
    margin-top: 0.3rem;
  }
`;

export default function UserFormModal() {
  const { userID } = getQS();
  const { signUp } = useAuth();
  const isEdit = Boolean(userID);
  const title = isEdit ? '회원 보기 및 수정' : '회원 생성';
  const { close } = useFormModal();

  const { action } = useActionAPI('users');
  const { data: user } = useGetAPI('users', {
    enabled: isEdit,
    id: Number(userID),
  });

  const validationSchema: IAnyObject = {
    username: yup.string().required('아이디를 입력해주세요'),
    email: yup.string().required('이메일을 입력해주세요'),
  };

  if (!isEdit) {
    validationSchema.password = yup
      .string()
      .required('비밀번호를 입력해주세요');
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      role: 'authenticated',
    },
    validationSchema: yup.object(validationSchema),
    onSubmit: async values => {
      if (isEdit) {
        const body = values as IAnyObject;

        if (!body.password) {
          delete body.password;
        }

        await action('put', body, Number(userID));

        close({
          message: '회원이 수정되었습니다',
        });
      } else {
        await signUp(values);

        regexMutate(/^\/users(\/.*)?(\?.*)?/);

        close({
          message: '회원이 생성되었습니다',
        });
      }
    },
  });

  React.useEffect(() => {
    if (user) {
      formik.setValues({
        username: user.username,
        email: user.email,
        password: '',
        role: user.role.type,
      });
    }
  }, [user]);

  return (
    <FormModal
      modalID="user"
      breadcrumb={['회원', title]}
      title={title}
      onSubmit={formik.submitForm}
      onReset={formik.resetForm}
      hasRequired
    >
      <UserFormModalContent>
        <Form formik={formik}>
          <FormSection
            index={1}
            title="필수 정보 작성"
            description={
              isEdit
                ? `비밀번호는 변경을 원하실때 입력해주세요.\n비밀번호를 입력하지 않으시면 비밀번호가 변경되지 않습니다.`
                : `필수 정보는 반드시 입력해야 되는 정보들입니다.\n입력하지 않았다면 회원 생성을 진행할 수 없습니다.`
            }
            required
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input name="username" label="아이디" />
              <Input type="password" name="password" label="비밀번호" />
              <Input name="email" label="이메일" />
              <Radio
                name="role"
                label="역할"
                options={[
                  { label: '일반', value: 'authenticated' },
                  { label: '관리자', value: 'admin' },
                ]}
              />
            </Space>
          </FormSection>

          <FormSection
            index={2}
            title="추가 정보 작성"
            description={
              isEdit
                ? undefined
                : `추가 정보는 필수 정보와 달리 반드시 입력할 필요가 없습니다.\n해당 정보는 데이터 수집용으로 사용됩니다.`
            }
          >
            test
          </FormSection>
        </Form>
      </UserFormModalContent>
    </FormModal>
  );
}
