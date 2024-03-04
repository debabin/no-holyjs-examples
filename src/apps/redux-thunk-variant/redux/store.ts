import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './api';
import { rootReducer } from './reducer';

export const baseStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const store = baseStore as typeof baseStore & {
  rootReducer: typeof rootReducer;
};

store.rootReducer = rootReducer;
