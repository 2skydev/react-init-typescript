import React from 'react';

import { TMiddlewareReturn, TPromiseReturn } from '../middleware/type';

interface IProps {
  middlewares: TMiddlewareReturn[];
  onMiddlewareError?: (payload: TPromiseReturn) => void;
  onMiddlewareSuccess?: (payload: TPromiseReturn) => void;
  children: React.ReactNode;
}

export default function Middleware({
  middlewares,
  children,
  onMiddlewareError,
  onMiddlewareSuccess,
}: IProps) {
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      async function runMiddleware(
        middlewares: TMiddlewareReturn[],
        index: number,
        payload: TPromiseReturn,
      ): Promise<TPromiseReturn> {
        if (!middlewares[index]) {
          return payload;
        }
        if (payload.success) {
          const response = await middlewares[index](payload);
          return runMiddleware(middlewares, index + 1, response);
        }

        return payload;
      }

      const result = await runMiddleware(middlewares, 0, {
        name: 'start',
        success: true,
      });
      setSuccess(result.success);

      if (result.success) {
        if (typeof onMiddlewareSuccess === 'function') {
          onMiddlewareSuccess(result);
        }
      } else {
        if (typeof onMiddlewareError === 'function') {
          onMiddlewareError(result);
        }
      }
    })();
  }, []);

  return success ? <>{children}</> : <></>;
}
