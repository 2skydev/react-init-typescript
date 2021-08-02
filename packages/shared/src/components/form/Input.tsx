import React from 'react';

import { Input as AntInput, InputProps } from 'antd';
import { useField } from 'formik';
import styled from 'styled-components';

import { FormField } from '@web/shared/components/form/Form';
import { IAnyObject } from '@web/shared/types/etc';

const { TextArea } = AntInput;

const InputBox = styled.div`
  .ant-input {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-left: 0;
  }

  &.simple {
    .ant-input {
      border: none;

      &::placeholder {
      }
    }
  }
`;

interface TmpTypes {
  name: string;
  label: string;
  error: string;
  onChange: any;
  value: any;
  placeholder: any;
  props: any;
}

export interface InputTypes extends InputProps {
  name: string;
  label?: string;
  helperText?: string;
  theme?: 'default' | 'simple';
  multiLine?: boolean;
  minRows?: number;
  maxRows?: number;
  placeholder?: string;
}

export default React.memo(function Input({
  name,
  helperText,
  label,
  theme = 'default',
  multiLine = false,
  placeholder,
  minRows = 1,
  maxRows = 30,
  ...props
}: InputTypes) {
  const [field, meta, helpers] = useField(name);
  const onChange = field.onChange;
  const value = field.value;

  return (
    <InputBox className={theme}>
      <FormField label={label} error={meta.error as string}>
        {multiLine ? (
          <TextArea
            name={name}
            onChange={onChange}
            value={value}
            maxLength={100}
            autoSize={{ minRows: minRows, maxRows: maxRows }}
            placeholder={placeholder}
          />
        ) : (
          <AntInput
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            {...props}
          />
        )}
      </FormField>
    </InputBox>
  );
});
