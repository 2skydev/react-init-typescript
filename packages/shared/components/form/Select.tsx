import React, { useContext } from 'react';

import { Select as AntSelect } from 'antd';
import { FormikContext } from 'formik';

import { FormField } from 'shared/components/form/Form';

interface OptionType {
  label: string;
  value: string;
}

interface SelectTypes {
  name: string;
  label?: string;
  helperText?: string;
  options: Array<OptionType>;
}

export default function Select({
  name,
  label,
  options,
  helperText,
}: SelectTypes) {
  const formik = useContext(FormikContext);
  const error = formik.errors[name];

  const onChange = (value: string) => {
    formik.setFieldValue(name, value);
  };

  return (
    <FormField
      label={label}
      error={error ? helperText || (error as string) : ''}
    >
      <AntSelect defaultValue={formik.values[name]} onChange={onChange}>
        <AntSelect.Option value="">선택</AntSelect.Option>

        {options.map(v => (
          <AntSelect.Option key={v.value} value={v.value}>
            {v.label}
          </AntSelect.Option>
        ))}
      </AntSelect>
    </FormField>
  );
}
