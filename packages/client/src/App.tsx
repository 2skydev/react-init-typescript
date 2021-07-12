import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SWRConfig } from 'swr';

import { APIFetcher } from '@web/shared/apis';
import URouteSwitch from '@web/shared/routes/URouteSwitch';

import { SignIn } from './SignIn';
import { Test } from './Test';
import routes from './config/route';
import { useRootSelector } from './hooks/useRootSelector';
import { increase, decrease } from './stores/modules/test';

import 'antd/dist/antd.css';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const count = useRootSelector(state => state.test.count);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: APIFetcher,
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
      <Test />
      <div>-------route--------</div>
      <URouteSwitch routes={routes} dispatch={dispatch} history={history} />
    </SWRConfig>
  );
}

export default App;
