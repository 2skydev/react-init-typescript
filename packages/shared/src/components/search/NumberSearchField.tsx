import React from 'react';

import { Form, InputNumber } from 'antd';
import styled from 'styled-components';

const NumberWrapper = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin: 0 0.5rem;
  }
`;

interface IProps {
  name: string;
}

export default function NumberSearchField({ name }: IProps) {
  return (
    <NumberWrapper>
      <Form.Item name={[name, 'min']} noStyle>
        <InputNumber />
      </Form.Item>
      <span>부터</span>
      <Form.Item name={[name, 'max']} noStyle>
        <InputNumber />
      </Form.Item>
      <span>까지</span>
    </NumberWrapper>
  );
}
