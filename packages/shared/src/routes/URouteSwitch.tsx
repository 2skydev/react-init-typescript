import React, { Dispatch } from 'react';
import { Switch } from 'react-router-dom';

import { History } from 'history';

import { IRoute } from '.';
import URoute from './URoute';

interface IProps {
  routes: IRoute[];
  dispatch: Dispatch<any>;
  history: History<unknown>;
}

export default function URouteSwitch({ routes, dispatch, history }: IProps) {
  return (
    <Switch>
      {routes.map(route => (
        <URoute
          key={route.path}
          {...route}
          dispatch={dispatch}
          history={history}
        />
      ))}
    </Switch>
  );
}
