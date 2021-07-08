import { BrowserRouter } from 'react-router-dom';

import { SWRConfig } from 'swr';

import instanceAxios from '@web/shared/apis';
import MiddlewareRoute from '@web/shared/components/route/MiddlewareRoute';
import MiddlewareSwitch from '@web/shared/components/route/MiddlewareSwitch';

import { SignIn } from './SignIn';
import { Test } from './Test';

import 'antd/dist/antd.css';

function App() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: async url => (await instanceAxios.get(url)).data,
      }}
    >
      <SignIn />

      <BrowserRouter>
        <MiddlewareSwitch></MiddlewareSwitch>
        <MiddlewareRoute></MiddlewareRoute>
      </BrowserRouter>

      <Test />
    </SWRConfig>
  );
}

export default App;
