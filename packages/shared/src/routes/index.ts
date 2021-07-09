import React, { Dispatch } from 'react';

import { History } from 'history';

import { ITemplateProps, TTemplateKey } from '@web/shared/templates';

import { TMiddlewareReturn, TPromiseReturn } from '../middleware/type';

export interface IRoute {
  path: string;
  component: React.FC;
  template?: TTemplateKey;
  templateProps?: ITemplateProps;
  middleware?: TMiddlewareReturn[];
  onMiddlewareSuccess?: (
    dispatch: Dispatch<any>,
    history: History<unknown>,
    payload: TPromiseReturn,
  ) => void;
  onMiddlewareError?: (
    dispatch: Dispatch<any>,
    history: History<unknown>,
    payload: TPromiseReturn,
  ) => void;
}

export interface IRouteProp extends IRoute {
  dispatch: Dispatch<any>;
  history: History<unknown>;
  onChangePage: (
    template: TTemplateKey,
    templateProps?: ITemplateProps,
  ) => void;
}
