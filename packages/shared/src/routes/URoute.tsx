import { Route } from 'react-router-dom';

import { IRoute } from '.';
import Middleware from '../middleware/Middleware';
import templates from '../templates';

export default function URoute({
  path,
  component,
  template,
  middleware,
  onMiddlewareError,
  onMiddlewareSuccess,
}: IRoute) {
  const TemplateComponent = template ? templates[template] : templates.Default;
  return (
    <Route exact path={path}>
      {middleware ? (
        <Middleware
          middlewares={middleware}
          onMiddlewareError={onMiddlewareError}
          onMiddlewareSuccess={onMiddlewareSuccess}
        >
          <TemplateComponent>{component}</TemplateComponent>
        </Middleware>
      ) : (
        <TemplateComponent>{component}</TemplateComponent>
      )}
    </Route>
  );
}
