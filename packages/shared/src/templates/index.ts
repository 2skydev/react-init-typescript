import React from 'react';

import Admin, { IAdminTemplateProps } from './AdminTemplate';
import App from './AppTemplate';
import Default from './DefaultTemplate';

const templates = {
  App,
  Admin,
  Default,
};

export interface IMenu {
  name: string;
  icon?: React.ReactNode;
  subMenu?: IMenu[];
  link?: string;
}

export type ITemplateProps = IAdminTemplateProps;
export type TTemplateKey = keyof typeof templates;
export default templates;
