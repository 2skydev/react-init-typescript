import { useContext } from 'react';

import { Checkbox } from 'antd';
import { FormikContext } from 'formik';

import { FormField } from '@web/shared/components/form/Form';

interface CheckBoxTypes {
  name: string;
  label?: string;
  helperText?: string;
  options: Array<any>;
}

export default function CheckBox({
  name,
  label,
  helperText,
  options,
}: CheckBoxTypes) {
  const formik = useContext(FormikContext);
  const error = formik.errors[name];

  const onChange = (values: Array<string | number | boolean>) => {
    formik.setFieldValue(name, values);
  };

  return (
    <FormField
      label={label}
      error={error ? helperText || (error as string) : ''}
    >
      <Checkbox.Group
        options={options}
        defaultValue={['Apple']}
        onChange={onChange}
      />
    </FormField>
  );
}
