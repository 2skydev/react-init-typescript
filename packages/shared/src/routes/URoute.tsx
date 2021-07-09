import { Route } from 'react-router-dom';

import { IRouteProp } from '.';
import Middleware from '../middleware/Middleware';
import { TPromiseReturn } from '../middleware/type';

export default function URoute({
  path,
  component: Component,
  middleware,
  onMiddlewareError,
  onMiddlewareSuccess,
  dispatch,
  history,
}: IRouteProp) {
  const _onMiddlewareError = (payload: TPromiseReturn) => {
    onMiddlewareError && onMiddlewareError(dispatch, history, payload);
  };
  const _onMiddlewareSuccess = (payload: TPromiseReturn) => {
    onMiddlewareSuccess && onMiddlewareSuccess(dispatch, history, payload);
  };

  return (
    <Route exact path={path}>
      {middleware && middleware.length ? (
        <Middleware
          middlewares={middleware}
          onMiddlewareError={_onMiddlewareError}
          onMiddlewareSuccess={_onMiddlewareSuccess}
        >
          <Component />
        </Middleware>
      ) : (
        <Component />
      )}
    </Route>
  );
}
