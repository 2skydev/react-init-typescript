import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Shared from '@web/shared/Shared';

import store from '~/redux/store';

import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <Shared>
      <App />
    </Shared>
  </Provider>,
  document.getElementById('root'),
);
