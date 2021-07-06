import { string } from 'yup/lib/locale';

import React, { ReactChild, ReactChildren, useContext } from 'react';

import {
  Input as AntInput,
  InputProps,
  Select as AntSelect,
  Checkbox,
} from 'antd';
import { useFormik, FormikProps, FormikProvider, FormikContext } from 'formik';
import * as yup from 'yup';

interface Abc {
  email: string;
}

interface Type {
  formik: FormikProps<Abc>;
  children: ReactChild;
}

interface InputTypes extends InputProps {
  name: string;
  label?: string;
  helperText?: string;
}

interface SelectTypes {
  name: string;
  label?: string;
  helperText?: string;
  options: Array<any>;
}

interface CheckBoxTypes {
  name: string;
  label?: string;
  helperText?: string;
  options: Array<any>;
}

export const Test = () => {
  const formik = useFormik({
    initialValues: {
      email: '123',
      select: 'test1',
      checkbox: 'test1',
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
    validationSchema: yup.object({
      email: yup.number().required(),
      select: yup.string().required(),
      checkbox: yup.array().min(1),
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

      <button>submit</button>
    </Form>
  );
};

export const Form = ({ formik, children }: Type) => {
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="form">
        {children}
      </form>
    </FormikProvider>
  );
};

export const Input = ({ name, label, helperText, ...props }: InputTypes) => {
  const formik = useContext(FormikContext);

  return (
    <div>
      {label && <div>{label}</div>}

      <AntInput
        name="email"
        placeholder="Basic usage"
        onChange={formik.handleChange}
        value={formik.values[name]}
        {...props}
      />

      {formik.errors[name] && (
        <div className="helperText" style={{ color: 'red' }}>
          {helperText || '에러에러'}
        </div>
      )}
    </div>
  );
};

export const Select = ({
  name,
  label,
  options,
  helperText,
  ...props
}: SelectTypes) => {
  const formik = useContext(FormikContext);

  const onChange = (value: string) => {
    formik.setFieldValue(name, value);
  };

  return (
    <div>
      {label && <div>{label}</div>}

      <AntSelect defaultValue={formik.values[name]} onChange={onChange}>
        <AntSelect.Option value="">선택</AntSelect.Option>

        {options.map(v => (
          <AntSelect.Option key={v.value} value={v.label}>
            {v.value}
          </AntSelect.Option>
        ))}
      </AntSelect>

      {formik.errors[name] && (
        <div className="helperText" style={{ color: 'red' }}>
          {helperText || 'error'}
        </div>
      )}
    </div>
  );
};

export const CheckBox = ({
  name,
  label,
  helperText,
  options,
}: CheckBoxTypes) => {
  const formik = useContext(FormikContext);

  const onChange = (values: Array<string>) => {
    formik.setFieldValue(name, values);
  };

  return (
    <div>
      {label && <div>{label}</div>}

      <Checkbox.Group
        options={options}
        defaultValue={['Apple']}
        onChange={onChange}
      />

      {formik.errors[name] && (
        <div className="helperText" style={{ color: 'red' }}>
          {helperText || 'error'}
        </div>
      )}
    </div>
  );
};

export const CheckList = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export const RadioList = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};
