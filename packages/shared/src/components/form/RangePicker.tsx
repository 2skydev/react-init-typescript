import { useContext } from 'react';

import { DatePicker as AntDate } from 'antd';
import { FormikContext } from 'formik';

import { FormField } from '@web/shared/components/form/Form';

interface RangePickerTypes {
  name: string;
  label?: string;
  helperText?: string;
  type?: string;
}

export default function RangePicker({
  name,
  label,
  helperText,
}: RangePickerTypes) {
  const formik = useContext(FormikContext);
  const error = formik.errors[name];

  const onChange = (date: any, dateString: Array<string>) => {
    formik.setFieldValue(
      name,
      dateString.filter(v => v),
    );
  };

  return (
    <FormField
      label={label}
      error={error ? helperText || (error as string) : ''}
    >
      <AntDate.RangePicker
        onChange={onChange}
        defaultValue={formik.values[name]}
      />
    </FormField>
  );
}
