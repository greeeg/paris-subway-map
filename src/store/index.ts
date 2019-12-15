import {
  init,
  RematchDispatch,
  RematchRootState,
  RematchStore
} from '@rematch/core';
import map from './map';

const models = {
  map
};

export type AppModels = typeof models;
export type AppDispatch = RematchDispatch<AppModels>;
export type AppState = RematchRootState<AppModels>;

export const createStore = function(
  models: AppModels
): RematchStore<AppModels> {
  return init({ models });
};

export default models;
