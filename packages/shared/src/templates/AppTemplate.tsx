import React from 'react';

interface IProps {
  children?: React.ReactNode;
}

export default function AppTemplate({ children }: IProps) {
  return <>{children}</>;
}
