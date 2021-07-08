import React from 'react';

import middlewares from '@web/shared/middleware';
import { TTemplateKey } from '@web/shared/templates';

import { TMiddlewareReturn } from '../middleware/type';

export interface IRoute {
  path: string;
  component: React.FC;
  template?: TTemplateKey;
  middleware?: TMiddlewareReturn[];
  onMiddlewareSuccess: (payload: any) => void;
  onMiddlewareError: (payload: any) => void;
}
