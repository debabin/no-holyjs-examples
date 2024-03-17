import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '@/apps/redux-thunk-variant/redux/store';

import { updateCardDebounced } from '../helpers/updateCardDebounced';
import { githubActions, githubSelectors } from '../slices';

export interface IncrementReactionPayload {
  id: number;
  reaction: string;
}

export const action = createAction<IncrementReactionPayload>('github.incrementReaction');

export const thunk = createAsyncThunk<void, IncrementReactionPayload, { state: RootState }>(
  action.type,
  (payload, { dispatch, getState }) => {
    try {
      const state = getState();

      const { id, reaction } = payload;

      const cardsEntries = githubSelectors.getCardsEntities(state);

      const updatedCard = {
        ...cardsEntries[id],
        reactions: {
          ...cardsEntries[id].reactions,
          [reaction]: cardsEntries[id].reactions[reaction] + 1
        }
      };

      dispatch(githubActions.setCard(updatedCard));
      updateCardDebounced(id, updatedCard);
    } catch (error) {
      console.error(error);
    }
  }
);

export const incrementReaction = {
  thunk,
  action
};
