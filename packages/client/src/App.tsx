import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { SWRConfig } from 'swr';

import instanceAxios from '@web/shared/apis';
import MiddlewareRoute from '@web/shared/components/route/MiddlewareRoute';
import MiddlewareSwitch from '@web/shared/components/route/MiddlewareSwitch';

import { SignIn } from './SignIn';
import { Test } from './Test';
import { useRootSelector } from './hooks/useRootSelector';
import { increase, decrease } from './stores/modules/test';

import 'antd/dist/antd.css';

function App() {
  const dispatch = useDispatch();
  const count = useRootSelector(state => state.test.count);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: async url => (await instanceAxios.get(url)).data,
      }}
    >
      <SignIn />
      <button
        onClick={() => {
          dispatch(increase(100));
        }}
      >
        -
      </button>
      <span>{count}</span>
      <button
        onClick={() => {
          dispatch(decrease(100));
        }}
      >
        +
      </button>
      <BrowserRouter>
        <MiddlewareSwitch></MiddlewareSwitch>
        <MiddlewareRoute></MiddlewareRoute>
      </BrowserRouter>
      <Test />
    </SWRConfig>
  );
}

export default App;
