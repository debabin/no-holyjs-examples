import { combineSlices } from '@reduxjs/toolkit';

import { apiSlice } from './api';
import { profileSlice } from './slices/profile/slice';
import { sessionSlice } from './slices/session/slice';
import { themeSlice } from './slices/theme/slice';

export interface LazyLoadedSlices {}
export const rootReducer = combineSlices(sessionSlice, themeSlice, profileSlice, {
  [apiSlice.name]: apiSlice.reducer
}).withLazyLoadedSlices<LazyLoadedSlices>();
