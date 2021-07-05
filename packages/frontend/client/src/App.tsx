import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { SWRConfig } from 'swr';

import MiddlewareRoute from 'shared/MiddlewareRoute';
import axios from 'shared/apis';
import MiddlewareSwitch from 'shared/components/route/MiddlewareSwitch';

import Abc from './Abc';

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
      <Abc></Abc>
    </SWRConfig>
  );
}

export default App;
