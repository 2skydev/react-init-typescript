import React, { Dispatch } from 'react';

import { AxiosResponse } from 'axios';
import { Store } from 'redux';
import { SWRConfiguration } from 'swr';

import { SharedState } from '../redux/sharedReducer';

interface ISharedContextInitValue {
  dispatch?: Dispatch<any>;
  store?: Store<SharedState, any>;
  swrConfig?: SWRConfiguration;
  onError?: (error: AxiosResponse) => void;
}

const initContextValue: ISharedContextInitValue = {};

const sharedContext = React.createContext(initContextValue);

export const Provider = sharedContext.Provider;
export default sharedContext;
