import type { Reducer } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { cacheApi } from './api/cache';
import { name as sessionName, sessionSlice } from './slices/session/slice';
import { createReducerManager } from './reducer-manager';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const initialReducers = {
  [sessionName]: sessionSlice.reducer,
  [cacheApi.reducerPath]: cacheApi.reducer
};

const reducerManager = createReducerManager(initialReducers);

export const baseStore = configureStore({
  reducer: initialReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([cacheApi.middleware, sagaMiddleware])
});
sagaMiddleware.run(rootSaga);

export type RootState<State = Record<string, Reducer<any, any>>> = ReturnType<
  typeof store.getState
> &
  State;

export type AppDispatch = typeof store.dispatch;

export const store = baseStore as typeof baseStore & {
  reducerManager: ReturnType<typeof createReducerManager>;
  addReducer: (key: string, asyncReducer: any) => void;
  removeReducer: (key: string) => void;
};

store.reducerManager = reducerManager;

store.addReducer = (key: string, asyncReducer: any) => {
  store.reducerManager.add(key, asyncReducer);
  store.replaceReducer(store.reducerManager.create());
};

store.removeReducer = (key: string) => {
  store.reducerManager.remove(key);
  store.replaceReducer(store.reducerManager.create());
};
