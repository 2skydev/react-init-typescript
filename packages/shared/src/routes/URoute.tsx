import { Route } from 'react-router-dom';

import { IRouteProp } from '.';
import Middleware from '../middleware/Middleware';
import { TPromiseReturn } from '../middleware/type';
import templates from '../templates';

export default function URoute({
  path,
  component: Component,
  template,
  middleware,
  onMiddlewareError,
  onMiddlewareSuccess,
  dispatch,
  history,
}: IRouteProp) {
  const TemplateComponent = template ? templates[template] : templates.Default;

  const _onMiddlewareError = (payload: TPromiseReturn) => {
    onMiddlewareError && onMiddlewareError(dispatch, history, payload);
  };
  const _onMiddlewareSuccess = (payload: TPromiseReturn) => {
    onMiddlewareSuccess && onMiddlewareSuccess(dispatch, history, payload);
  };

  return (
    <Route exact path={path}>
      {middleware ? (
        <Middleware
          middlewares={middleware}
          onMiddlewareError={_onMiddlewareError}
          onMiddlewareSuccess={_onMiddlewareSuccess}
        >
          <TemplateComponent>
            <Component />
          </TemplateComponent>
        </Middleware>
      ) : (
        <TemplateComponent>
          <Component />
        </TemplateComponent>
      )}
    </Route>
  );
}
