import React from 'react';

import { useGetMe } from '@web/shared/apis/users';
import useAuth from '@web/shared/hooks/useAuth';

interface IBootstrapProps {
  onBootstrap?: () => Promise<void>;
  children: React.ReactNode;
}

export default function Bootstrap({ onBootstrap, children }: IBootstrapProps) {
  const { isSignIn, getToken } = useAuth();
  const { data: user } = useGetMe({ enabled: isSignIn });

  const bootstrap = async () => {
    if (onBootstrap) {
      await onBootstrap();
    }
  };

  React.useEffect(() => {
    bootstrap();
  }, []);

  return <div>{children}</div>;
}
