import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Shared from '@web/shared/Shared';

import App from '~/App';
import store from '~/redux/store';

if (!window.localStorage.getItem('token')) {
  window.localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3ODcwOTE4LCJleHAiOjE2MzA0NjI5MTh9.2XWJvyZGDI4P3BNBIF3HGp1tNO6eswysbMCfM_XneiY',
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Shared store={store}>
      <App />
    </Shared>
  </Provider>,
  document.getElementById('root'),
);
