import React from 'react';

interface IProps {
  hello: string;
  children?: React.ReactNode;
}

export default function AppTemplate({ hello, children }: IProps) {
  return <>{children}</>;
}
