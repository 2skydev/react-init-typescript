import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Shared from '@web/shared/Shared';

import App from '~/App';
import store from '~/redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Shared store={store}>
      <App />
    </Shared>
  </Provider>,
  document.getElementById('root'),
);
