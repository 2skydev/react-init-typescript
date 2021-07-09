import App from './AppTemplate';
import Default from './DefaultTemplate';

const templates = {
  App,
  Default,
};

export type TTemplateKey = keyof typeof templates;
export default templates;
