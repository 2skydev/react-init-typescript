import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AxiosResponse } from 'axios';
import { SWRConfig, SWRConfiguration } from 'swr';

import { APIFetcher } from '@web/shared/apis';
import Bootstrap from '@web/shared/components/bootstrap/Bootstrap';
import { Provider } from '@web/shared/contexts/SharedContext';
import useStrapiErrorAlert from '@web/shared/hooks/useStrapiErrorAlert';

interface IProps {
  store: any;
  swrConfig?: SWRConfiguration;
  onError?: (error: AxiosResponse) => void;
  children: ReactNode;
}

export default function Shared({
  store,
  swrConfig,
  onError,
  children,
}: IProps) {
  const { handleErrorAlert } = useStrapiErrorAlert();

  const handleOnError = onError || handleErrorAlert;

  return (
    <Provider
      value={{
        store,
        onError: handleOnError,
      }}
    >
      <SWRConfig
        value={{
          shouldRetryOnError: false,
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
