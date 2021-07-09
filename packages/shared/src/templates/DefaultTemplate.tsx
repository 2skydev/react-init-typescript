import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

export default function DefaultTemplate({ children }: IProps) {
  return <>{children}</>;
}
