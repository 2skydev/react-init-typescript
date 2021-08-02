import React from 'react';

import { Switch, Form } from 'antd';
import styled from 'styled-components';

interface IProps {
  label: string;
  name: string;
}

const ElumWrapper = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-right: 1rem;
  }
`;

export default function ElumSearchField({ label, name }: IProps) {
  return (
    <ElumWrapper>
      <span>{label}</span>
      <Form.Item noStyle valuePropName="checked" name={name}>
        <Switch />
      </Form.Item>
    </ElumWrapper>
  );
}
