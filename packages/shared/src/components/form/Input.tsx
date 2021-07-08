import { FormField } from '@web/shared/src/components/form/Form';

import React, { useContext } from 'react';

import { Input as AntInput, InputProps } from 'antd';
import { FormikContext } from 'formik';

interface InputTypes extends InputProps {
  name: string;
  label?: string;
  helperText?: string;
}

export default function Input({
  name,
  label,
  helperText,
  ...props
}: InputTypes) {
  const formik = useContext(FormikContext);
  const error = formik.errors[name];

  return (
    <FormField
      label={label}
      error={error ? helperText || (error as string) : ''}
    >
      <AntInput
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        {...props}
      />
    </FormField>
  );
}
