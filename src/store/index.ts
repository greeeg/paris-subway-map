import { init, RematchRootState } from '@rematch/core';
import map from './map';

const models = {
  map
};

export const store = init({
  models
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type StoreState = RematchRootState<typeof models>;
