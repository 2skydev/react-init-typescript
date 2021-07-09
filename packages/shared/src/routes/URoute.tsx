import React from 'react';
import { Route } from 'react-router-dom';

import { IRouteProp } from '.';
import Middleware from '../middleware/Middleware';
import { TPromiseReturn } from '../middleware/type';
import { ITemplateProps, TTemplateKey } from '../templates';

function TemplateActionComponent({
  children,
  template,
  templateProps,
  onChangePage,
}: {
  children: React.ReactNode;
  template?: TTemplateKey;
  templateProps?: ITemplateProps;
  onChangePage: (
    template: TTemplateKey,
    templateProps?: ITemplateProps,
  ) => void;
}) {
  React.useEffect(() => {
    if (template) {
      onChangePage(template, templateProps);
    }
  }, []);

  return <>{children}</>;
}

export default function URoute({
  path,
  template,
  templateProps,
  component: Component,
  middleware,
  onMiddlewareError,
  onMiddlewareSuccess,
  dispatch,
  history,
  onChangePage,
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
          <TemplateActionComponent
            template={template}
            templateProps={templateProps}
            onChangePage={onChangePage}
          >
            <Component />
          </TemplateActionComponent>
        </Middleware>
      ) : (
        <TemplateActionComponent
          template={template}
          templateProps={templateProps}
          onChangePage={onChangePage}
        >
          <Component />
        </TemplateActionComponent>
      )}
    </Route>
  );
}
