import { IRoute } from '@web/shared/routes';
import { IAdminTemplateProps } from '@web/shared/templates/AdminTemplate';

import Home from '~/pages/Home';
import Test from '~/pages/Test';

const routes: IRoute[] = [
  {
    path: '/test',
    component: Test,
    template: 'Admin',
    templateProps: {
      footer: 'this is test page footer!!!',
    } as IAdminTemplateProps,
  },
  {
    path: '/',
    component: Home,
    template: 'Admin',
  },
];

export default routes;
