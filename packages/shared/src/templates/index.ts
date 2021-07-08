import React from 'react';

import AppTemplate, {
  IProps as AppProps,
  TName as AppTemplateName,
} from './AppTemplate';

export type TTemplateName = AppTemplateName;
export type TTemplateProps = AppProps;

const templates: {
  [key in TTemplateName]: React.FC<TTemplateProps>;
} = {
  APP: AppTemplate,
};
export default templates;
