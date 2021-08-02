import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import URouteSwitch from '@web/shared/routes/URouteSwitch';

import { AppStyle } from './AppStyle';
import routes from './config/route';
import defaultTemplateProps from './config/template';

import 'antd/dist/antd.css';

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <AppStyle id="AppStyle">
      <URouteSwitch
        routes={routes}
        templateProps={defaultTemplateProps}
        dispatch={dispatch}
        history={history}
      />
    </AppStyle>
  );
}

export default App;
