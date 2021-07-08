import { FormField } from '@web/shared/src/components/form/Form';

import { useContext } from 'react';

import { Checkbox } from 'antd';
import { FormikContext } from 'formik';

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

  const onChange = (values: Array<string | number | boolean>) => {
    formik.setFieldValue(name, values);
  };

  return (
    <FormField
      label={label}
      error={formik.errors[name] as string | undefined}
      text={helperText}
    >
      <Checkbox.Group
        options={options}
        defaultValue={['Apple']}
        onChange={onChange}
      />
    </FormField>
  );
}
