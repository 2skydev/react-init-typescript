import middlewares from '@web/shared/middleware';
import { IRoute } from '@web/shared/routes';

import Home from '~/pages/Home';
import { increase } from '~/stores/modules/test';

const routes: IRoute[] = [
  {
    path: '/',
    component: Home,
    middleware: [middlewares.authMiddleware],
    onMiddlewareSuccess: (dispatch, history, payload) => {
      dispatch(increase(1000));
    },
    onMiddlewareError: (dispatch, history, payload) => {
      history.replace('/ttest');
    },
  },
];

export default routes;
