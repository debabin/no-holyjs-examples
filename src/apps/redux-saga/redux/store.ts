import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { cacheApi } from './api/cache';
import { createReducerManager } from './reducer-manager';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const staticReducers = {
  [cacheApi.reducerPath]: cacheApi.reducer
};

export const baseStore = configureStore({
  reducer: staticReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([cacheApi.middleware, sagaMiddleware])
});
sagaMiddleware.run(rootSaga);

const reducerManager = createReducerManager(staticReducers);

export type RootState<InjectedState = undefined> = ReturnType<typeof store.getState> &
  InjectedState;
export type AppDispatch = typeof store.dispatch;

export const store: typeof baseStore & {
  reducerManager: ReturnType<typeof createReducerManager>;
  addReducer: (key: string, asyncReducer: any) => void;
  removeReducer: (key: string) => void;
} = baseStore;

store.reducerManager = reducerManager;

store.addReducer = (key: string, asyncReducer: any) => {
  store.reducerManager.add(key, asyncReducer);
  console.log('@store.reducerManager.create()', store.reducerManager.create());
  store.replaceReducer(store.reducerManager.create());
};

store.removeReducer = (key: string) => {
  store.reducerManager.remove(key);
  store.replaceReducer(store.reducerManager.create());
};
