import React from 'react';

import { Checkbox, Form } from 'antd';

interface IProps {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}

export default function ElumSearchField({ label, options }: IProps) {
  return (
    <div>
      <Form.Item noStyle name={label}>
        <Checkbox.Group name={label} options={options} />
      </Form.Item>
    </div>
  );
}
