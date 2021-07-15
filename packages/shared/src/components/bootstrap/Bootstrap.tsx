import React from 'react';

import { AnimatePresence, motion, MotionConfig } from 'framer-motion';

import { useGetMe } from '@web/shared/apis/users';
import sharedContext from '@web/shared/contexts/SharedContext';
import useAuth from '@web/shared/hooks/useAuth';
import { setUser } from '@web/shared/redux/slices/auth';

interface IBootstrapProps {
  children: React.ReactNode;
}

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
              style={{ position: 'absolute' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {children}
            </motion.div>
          )}

          {!isFinish && (
            <motion.div
              key="bootstrap-loading"
              style={{ position: 'absolute' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              로딩중...
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
}
