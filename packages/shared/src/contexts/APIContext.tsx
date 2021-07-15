import React from 'react';

import { AxiosResponse } from 'axios';
import { SWRConfiguration } from 'swr';

interface IAPIInitValue {
  swrConfig?: SWRConfiguration;
  onError?: (error: AxiosResponse) => void;
}

const initContextValue: IAPIInitValue = {};

const APIContext = React.createContext(initContextValue);

export const Provider = APIContext.Provider;
export default APIContext;
