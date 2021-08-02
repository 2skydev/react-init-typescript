import { IRoute } from '@web/shared/routes';

import User from '~/pages/User';

const routes: IRoute[] = [
  {
    path: '/',
    component: User,
    template: 'Admin',
  },
];

export default routes;
