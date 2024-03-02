import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducer';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const baseStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([sagaMiddleware])
});

export const createSagaInjector = () => {
  const injectedSagas = new Map();
  const isInjected = (key: string) => injectedSagas.has(key);

  const injectSaga = (key: string, saga: () => Generator<any>) => {
    if (isInjected(key)) return;

    const task = sagaMiddleware.run(saga);

    injectedSagas.set(key, task);
  };

  injectSaga('root', rootSaga);
  return { inject: injectSaga };
};

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = baseStore as typeof baseStore & {
  rootReducer: typeof rootReducer;
  sagaInjector: ReturnType<typeof createSagaInjector>;
};

store.rootReducer = rootReducer;
store.sagaInjector = createSagaInjector();
