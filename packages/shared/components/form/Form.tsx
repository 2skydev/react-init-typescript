import React from 'react';

import { Input as AntInput } from 'antd';
import { withFormik, useFormik } from 'formik';
import * as yup from 'yup';

export const Test = () => {
  const formik = useFormik({
    initialValues: {
      email: '123',
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
    validationSchema: yup.object({
      email: yup
        .number()
        .typeError('숫자만 입력가능.')
        .required('이메일을 입력해주세요.'),
    }),
  });

  return (
    <div>
      <Form formik={formik}>
        <div>테스트</div>
      </Form>
    </div>
  );
};

export const Form = ({ formik, children }) => {
  console.log(formik.values.email);

  return (
    <div className="form">
      <div>1</div>

      <AntInput
        name="email"
        placeholder="Basic usage"
        onChange={formik.handleChange}
      />

      {formik.errors.email && <div className="helperText">{'에러에러'}</div>}
    </div>
  );
};
