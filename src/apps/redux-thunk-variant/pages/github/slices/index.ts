import { combineSlices } from '@reduxjs/toolkit';

import { cardEntriesSlice } from './cardEntries/slice';
import { selectSlice } from './select/slice';

export const githubPrefix = 'github';

export const githubReducer = combineSlices(selectSlice, cardEntriesSlice);
export const githubReducerSlices = [selectSlice, cardEntriesSlice];
export const githubActions = {
  ...selectSlice.actions,
  ...cardEntriesSlice.actions
};

declare module '@redux-thunk-variant/redux/reducer' {
  interface LazyLoadedSlices {
    github: SliceState<typeof githubReducer>;
  }
}

export * as githubSelectors from './selectors';
