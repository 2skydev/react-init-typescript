import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Form,
  Input,
  Select,
  CheckBox,
  Radio,
} from 'shared/components/form/Form';

export const Test = () => {
  const formik = useFormik({
    initialValues: {
      email: '123',
      select: 'test1',
      checkbox: 'test1',
      radio: 'test2',
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
    validationSchema: yup.object({
      email: yup
        .number()
        .typeError('테스트')
        .required('아이디는 숫자만 입력 가능'),
      select: yup.string().required(),
      checkbox: yup.array().min(2, '2개이상 선택'),
    }),
  });

  const options = [
    {
      label: 'test1',
      value: 'test1',
    },
    {
      label: 'test2',
      value: 'test2',
    },
  ];

  return (
    <Form formik={formik}>
      <Input
        label="아이디"
        name="email"
        helperText="아이디는 숫자 형식으로 입력해주세요"
      />
      <Select name="select" options={options} helperText="선택해주세요" />
      <CheckBox name="checkbox" options={options} helperText="한개이상 선택" />
      <Radio name="radio" options={options} helperText="한개이상 선택" />

      <button>submit</button>
    </Form>
  );
};
