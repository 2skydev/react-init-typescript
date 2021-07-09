import Admin from './AdminTemplate';
import App from './AppTemplate';
import Default from './DefaultTemplate';

const templates = {
  App,
  Admin,
  Default,
};

export type TTemplateKey = keyof typeof templates;
export default templates;
