import { ITemplateProps, TTemplateKey } from '@web/shared/templates';
import { IAdminTemplateProps } from '@web/shared/templates/AdminTemplate';

export const adminTemplateProps: IAdminTemplateProps = {
  menus: [],
  logo: '',
  footer: 'this is footer',
};

const defaultTemplateProps = {
  Admin: adminTemplateProps,
} as Record<TTemplateKey, ITemplateProps>;

export default defaultTemplateProps;
