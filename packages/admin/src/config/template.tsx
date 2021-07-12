import { UserOutlined, LaptopOutlined } from '@ant-design/icons';

import { ITemplateProps, TTemplateKey } from '@web/shared/templates';
import { IAdminTemplateProps } from '@web/shared/templates/AdminTemplate';

export const adminTemplateProps: IAdminTemplateProps = {
  menus: [
    {
      name: '메뉴1',
      icon: <UserOutlined />,
      subMenu: [
        {
          name: '메뉴 1-1',
          link: '/test',
        },
        {
          name: '메뉴 1-2',
          link: '/test',
        },
      ],
    },
    {
      name: '메뉴2',
      icon: <LaptopOutlined />,
      subMenu: [
        {
          name: '메뉴 2-1',
          link: '/test',
        },
        {
          name: '메뉴 2-2',
          link: '/test',
        },
      ],
    },
  ],
  logo: '',
  footer: 'this is footer',
};

const defaultTemplateProps = {
  Admin: adminTemplateProps,
} as Record<TTemplateKey, ITemplateProps>;

export default defaultTemplateProps;
