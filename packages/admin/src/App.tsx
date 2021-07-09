import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SWRConfig } from 'swr';

import instanceAxios from '@web/shared/apis';
import URouteSwitch from '@web/shared/routes/URouteSwitch';

import routes from './config/route';

import 'antd/dist/antd.css';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        fetcher: async url => (await instanceAxios.get(url)).data,
      }}
    >
      <URouteSwitch routes={routes} dispatch={dispatch} history={history} />
    </SWRConfig>
  );
}

export default App;
