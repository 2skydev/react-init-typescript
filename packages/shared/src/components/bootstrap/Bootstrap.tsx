import React from 'react';

import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import styled from 'styled-components';

import { useGetMe } from '@web/shared/apis/users';
import sharedContext from '@web/shared/contexts/SharedContext';
import useAuth from '@web/shared/hooks/useAuth';
import { setUser } from '@web/shared/redux/slices/auth';

interface IBootstrapProps {
  children: React.ReactNode;
}

const Loading = styled.div`
  .bootstrapLoading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function Bootstrap({ children }: IBootstrapProps) {
  const { store } = React.useContext(sharedContext);
  const { isSignIn } = useAuth();
  const { data: user } = useGetMe({ enabled: isSignIn });

  const isFinish = isSignIn ? Boolean(user) : true;

  React.useEffect(() => {
    if (user) {
      store?.dispatch(setUser(user));
    }
  }, [user]);

  return (
    <>
      <MotionConfig transition={{ duration: 0.3 }}>
        <AnimatePresence>
          {isFinish && (
            <motion.div
              key="bootstrap-render"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>
          )}

          {!isFinish && (
            <Loading>
              <motion.div
                className="bootstrapLoading"
                key="bootstrap-loading"
                style={{ position: 'absolute' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                로딩중...
              </motion.div>
            </Loading>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
}
