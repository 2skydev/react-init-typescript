import { useContext } from 'react';

import { Radio as AntRadio } from 'antd';
import { FormikContext } from 'formik';

import { FormField } from '@web/shared/components/form/Form';

interface RadioTypes {
  name: string;
  label?: string;
  helperText?: string;
  options: Array<any>;
}

export default function Radio({
  name,
  label,
  helperText,
  options,
}: RadioTypes) {
  const formik = useContext(FormikContext);

  const onChange = (e: any) => {
    formik.setFieldValue(name, e.target.value);
  };

  return (
    <FormField
      label={label}
      error={formik.errors[name] as string | undefined}
      text={helperText}
    >
      <AntRadio.Group
        name={name}
        defaultValue={formik.values[name] || options[0].value}
        onChange={onChange}
      >
        {options.map(v => (
          <AntRadio key={v.value} value={v.value}>
            {v.label}
          </AntRadio>
        ))}
      </AntRadio.Group>
    </FormField>
  );
}
