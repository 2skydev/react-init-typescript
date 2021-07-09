import Admin, { IAdminTemplateProps } from './AdminTemplate';
import App from './AppTemplate';
import Default from './DefaultTemplate';

const templates = {
  App,
  Admin,
  Default,
};

export type ITemplateProps = IAdminTemplateProps;
export type TTemplateKey = keyof typeof templates;
export default templates;
