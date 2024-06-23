import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducer';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const createStore = () => {
  const baseStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
  });

  const store = baseStore as typeof baseStore & {
    rootReducer: typeof rootReducer;
  };
  store.rootReducer = rootReducer;
  return store;
};

export const store = createStore();
