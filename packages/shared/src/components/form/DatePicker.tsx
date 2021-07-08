import { useContext } from 'react';

import { DatePicker as AntDate } from 'antd';
import { FormikContext } from 'formik';

import { FormField } from '@web/shared/components/form/Form';

interface DatePickerTypes {
  name: string;
  label?: string;
  helperText?: string;
  type?: string;
}

export default function DatePicker({
  name,
  label,
  helperText,
}: DatePickerTypes) {
  const formik = useContext(FormikContext);
  const error = formik.errors[name];

  const onChange = (date: any, dateString: string) => {
    formik.setFieldValue(name, dateString);
  };

  return (
    <FormField
      label={label}
      error={error ? helperText || (error as string) : ''}
    >
      <AntDate onChange={onChange} defaultValue={formik.values[name]} />
    </FormField>
  );
}
