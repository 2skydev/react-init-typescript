import React from 'react';

import { Form, Input, Select } from 'antd';

interface IField {
  label: string;
  value: string;
}

interface IProps {
  fields: IField[];
  onFieldChange?: (value: string) => void;
  onChange?: (value: string) => void;
}

const { Option } = Select;

export default function TextSearchField({
  fields,
  onFieldChange,
  onChange,
}: IProps) {
  return (
    <>
      <Input.Group compact>
        <Form.Item name={['keyword', 'field']} noStyle>
          <Select style={{ width: '20%' }}>
            <Option value="">선택</Option>
            {fields.map((field, i) => (
              <Option key={i} value={field.value}>
                {field.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={['keyword', 'value']} noStyle>
          <Input
            style={{ width: '80%' }}
            placeholder="검색어를 입력해주세요."
          />
        </Form.Item>
      </Input.Group>
    </>
  );
}
