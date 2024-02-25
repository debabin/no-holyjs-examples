import { combineSlices } from '@reduxjs/toolkit';

import { stageSlice } from './stage/slice';

export const authPrefix = 'auth';
export const authReducer = combineSlices(stageSlice);
