import 'antd/dist/antd.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { SWRConfig } from 'swr';

import axios from 'shared/apis';
import MiddlewareRoute from 'shared/components/route/MiddlewareRoute';
import MiddlewareSwitch from 'shared/components/route/MiddlewareSwitch';

import Abc from './Abc';
import { Test } from './Test';

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
