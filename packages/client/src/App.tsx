import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import URouteSwitch from '@web/shared/routes/URouteSwitch';

import routes from './config/route';

import 'antd/dist/antd.css';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <URouteSwitch routes={routes} dispatch={dispatch} history={history} />
    </>
  );
}

export default App;
