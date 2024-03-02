import { combineSlices } from '@reduxjs/toolkit';

import { profileSlice } from './slices/profile/slice';
import { sessionSlice } from './slices/session/slice';
import { themeSlice } from './slices/theme/slice';
import { apiSlice } from './api';

export interface LazyLoadedSlices {}
export const rootReducer = combineSlices(sessionSlice, themeSlice, profileSlice, {
  [apiSlice.reducerPath]: apiSlice.reducer
}).withLazyLoadedSlices<LazyLoadedSlices>();
