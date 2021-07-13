import React from 'react';

import { AxiosResponse } from 'axios';
import { SWRConfig, SWRConfiguration } from 'swr';

import { APIFetcher } from '@web/shared/apis';
import useStrapiErrorAlert from '@web/shared/hooks/useStrapiErrorAlert';

interface IProps {
  swrConfig?: SWRConfiguration;
  onError?: (error: AxiosResponse) => void;
  children: React.ReactNode;
}

interface IAPIInitValue {
  onError?: (error: AxiosResponse) => void;
}

const initContextValue: IAPIInitValue = {};

const APIContext = React.createContext(initContextValue);

export default APIContext;

export function APIContextProvider({ swrConfig, onError, children }: IProps) {
  const { handleErrorAlert } = useStrapiErrorAlert();

  const handleError = onError || handleErrorAlert;

  return (
    <APIContext.Provider
      value={{
        onError: handleError,
      }}
    >
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher: APIFetcher,
          onError: handleError,
          ...swrConfig,
        }}
      >
        {children}
      </SWRConfig>
    </APIContext.Provider>
  );
}
