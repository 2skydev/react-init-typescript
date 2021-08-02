import { ITemplateProps, TTemplateKey } from '@web/shared/templates';
import { IAdminTemplateProps } from '@web/shared/templates/AdminTemplate';

export const adminTemplateProps: IAdminTemplateProps = {
  menus: [
    {
      name: '회원',
      link: '/',
      subMenu: [
        {
          name: '회원 목록',
          link: '/',
        },
      ],
    },
    {
      name: '테스트',
      link: '/test1',
      subMenu: [
        {
          name: 'test1',
          link: '/test1',
        },
        {
          name: 'test2',
          link: '/test2',
        },
      ],
    },
  ],
};

const defaultTemplateProps = {
  Admin: adminTemplateProps,
} as Record<TTemplateKey, ITemplateProps>;

export default defaultTemplateProps;
