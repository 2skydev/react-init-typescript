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
  const error = formik.errors[name];

  const onChange = (e: any) => {
    formik.setFieldValue(name, e.target.value);
  };

  return (
    <FormField
      label={label}
      error={error ? helperText || (error as string) : ''}
    >
      <AntRadio.Group
        name={name}
        value={formik.values[name] || options[0].value}
        onChange={onChange}
      >
        {options.map(v => (
          <div
            key={v.value}
            style={v?.style ? v.style : {}}
            className="radioBox"
          >
            <AntRadio value={v.value}>{v.label}</AntRadio>
            {v?.children && v.children}
          </div>
        ))}
      </AntRadio.Group>
    </FormField>
  );
}
