import { combineReducers } from '@reduxjs/toolkit';

import test from './test';

const rootReducer = combineReducers({
  test,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
