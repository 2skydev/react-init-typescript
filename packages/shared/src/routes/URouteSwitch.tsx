import React, { Dispatch } from 'react';
import { Route, Switch } from 'react-router-dom';

import { History } from 'history';

import { IRoute } from '.';
import templates, { TTemplateKey } from '../templates';
import URoute from './URoute';

interface IProps {
  routes: IRoute[];
  dispatch: Dispatch<any>;
  history: History<unknown>;
}

export default React.memo(function URouteSwitch({
  routes,
  dispatch,
  history,
}: IProps) {
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

  return (
    <Switch>
      {Object.entries(templateGroupRoutes).map(([key, groupRoutes]) => {
        const TemplateComponent = templates[key as TTemplateKey];
        const templatePaths = groupRoutes.map(route => route.path);

        return (
          <Route key={key} path={templatePaths}>
            <TemplateComponent>
              {groupRoutes.map(route => (
                <URoute
                  key={route.path}
                  {...route}
                  dispatch={dispatch}
                  history={history}
                />
              ))}
            </TemplateComponent>
          </Route>
        );
      })}
    </Switch>
  );
});
