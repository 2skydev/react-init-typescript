import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import rootReducer from './stores/modules';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
