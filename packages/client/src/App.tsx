import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import URouteSwitch from '@web/shared/routes/URouteSwitch';

import { increase, decrease } from '~/redux/slices/test';

import { SignIn } from './SignIn';
import { Test } from './Test';
import routes from './config/route';
import { useRootSelector } from './hooks/useRootSelector';

import 'antd/dist/antd.css';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const count = useRootSelector(state => state.test.count);
  const count2 = useRootSelector(state => state.shared.auth.count);

  console.log(count2);

  return (
    <>
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
    </>
  );
}

export default App;
