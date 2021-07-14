import { configureStore } from '@reduxjs/toolkit';

import sharedReducer from '@web/shared/redux/sharedReducer';

import reducers from '~/redux/reducers';

const store = configureStore({
  reducer: {
    ...reducers,
    shared: sharedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
