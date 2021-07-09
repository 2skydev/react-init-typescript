import { IRoute } from '@web/shared/routes';

import Home from '~/pages/Home';

const routes: IRoute[] = [
  {
    path: '/test',
    component: Home,
    template: 'Admin',
  },
  {
    path: '/',
    component: Home,
    template: 'Admin',
  },
];

export default routes;
