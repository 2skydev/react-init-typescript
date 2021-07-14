import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AxiosResponse } from 'axios';
import { SWRConfig, SWRConfiguration } from 'swr';

import { APIFetcher } from '@web/shared/apis';
import Bootstrap from '@web/shared/components/bootstrap/Bootstrap';
import { Provider } from '@web/shared/contexts/APIContext';
import useStrapiErrorAlert from '@web/shared/hooks/useStrapiErrorAlert';

interface IProps {
  swrConfig?: SWRConfiguration;
  onError?: (error: AxiosResponse) => void;
  children: ReactNode;
}

export default function Shared({ swrConfig, onError, children }: IProps) {
  const { handleErrorAlert } = useStrapiErrorAlert();

  const handleOnError = onError || handleErrorAlert;

  return (
    <Provider
      value={{
        onError: handleOnError,
      }}
    >
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher: APIFetcher,
          onError: handleOnError,
          ...swrConfig,
        }}
      >
        <BrowserRouter>
          <Bootstrap>{children}</Bootstrap>
        </BrowserRouter>
      </SWRConfig>
    </Provider>
  );
}
