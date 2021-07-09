import React, { Dispatch } from 'react';
import { Route, Switch } from 'react-router-dom';

import { History } from 'history';

import { IRoute } from '.';
import templates, { ITemplateProps, TTemplateKey } from '../templates';
import _defaultTemplateProps from '../templates/defaultProps';
import URoute from './URoute';

interface IProps {
  routes: IRoute[];
  dispatch: Dispatch<any>;
  history: History<unknown>;
  templateProps?: Record<TTemplateKey, ITemplateProps>;
}

export default React.memo(function URouteSwitch({
  routes,
  dispatch,
  history,
  templateProps: initTemplateProps,
}: IProps) {
  const [templateProps, setTemplateProps] = React.useState(
    initTemplateProps || _defaultTemplateProps,
  );
  const templateGroupRoutes = routes.reduce(
    (acc, route) => {
      route.template = route.template || 'Default';
      if (acc[route.template]) {
        acc[route.template] = [...acc[route.template], route];
      } else {
        acc[route.template] = [route];
      }
      return acc;
    },
    {} as {
      [key in TTemplateKey]: IRoute[];
    },
  );

  const onChangePage = (
    templateName: TTemplateKey,
    templateProps?: ITemplateProps,
  ) => {
    const _initTemplateProps = initTemplateProps || _defaultTemplateProps;

    setTemplateProps({
      ..._initTemplateProps,
      [templateName]: {
        ..._initTemplateProps[templateName],
        ...templateProps,
      },
    });
  };

  return (
    <Switch>
      {Object.entries(templateGroupRoutes).map(([key, groupRoutes]) => {
        const TemplateComponent = templates[key as TTemplateKey];
        const templatePaths = groupRoutes.map(route => route.path);

        return (
          <Route key={key} path={templatePaths}>
            <TemplateComponent {...templateProps[key as TTemplateKey]}>
              {groupRoutes.map(route => (
                <URoute
                  key={route.path}
                  {...route}
                  dispatch={dispatch}
                  history={history}
                  onChangePage={onChangePage}
                />
              ))}
            </TemplateComponent>
          </Route>
        );
      })}
    </Switch>
  );
});
