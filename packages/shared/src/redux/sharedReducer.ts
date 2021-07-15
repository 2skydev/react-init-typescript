import { combineReducers } from '@reduxjs/toolkit';

import auth from './slices/auth';

// slice들의 reducer를 sharedReducer로 합치기
const sharedReducer = combineReducers({
  auth,
});

// state 타입 반환
export type SharedState = ReturnType<typeof sharedReducer>;

// sharedReducer 반환
export default sharedReducer;
