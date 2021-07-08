import React, { useContext } from 'react';

import { Input as AntInput, InputProps } from 'antd';
import { FormikContext } from 'formik';

import { FormField } from '@web/shared/components/form/Form';

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

  return (
    <FormField
      label={label}
      error={formik.errors[name] as string | undefined}
      text={helperText}
    >
      <AntInput
        name="email"
        placeholder="Basic usage"
        onChange={formik.handleChange}
        value={formik.values[name]}
        {...props}
      />
    </FormField>
  );
}
