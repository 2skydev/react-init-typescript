import { BrowserRouter } from 'react-router-dom';

import { SWRConfig } from 'swr';

import axios from '@web/shared/src/apis';
import MiddlewareRoute from '@web/shared/src/components/route/MiddlewareRoute';
import MiddlewareSwitch from '@web/shared/src/components/route/MiddlewareSwitch';

import Abc from './Abc';
import { Test } from './Test';

import 'antd/dist/antd.css';

function App() {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: url => axios.get(url),
      }}
    >
      <BrowserRouter>
        <MiddlewareSwitch></MiddlewareSwitch>
        <MiddlewareRoute></MiddlewareRoute>
      </BrowserRouter>

      <Abc />
      <Test />
    </SWRConfig>
  );
}

export default App;