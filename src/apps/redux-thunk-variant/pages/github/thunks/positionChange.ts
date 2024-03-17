import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '@/apps/redux-thunk-variant/redux/store';

import { updateCardDebounced } from '../helpers/updateCardDebounced';
import { githubActions, githubSelectors } from '../slices';

export interface PositionChangePayload {
  position: { x: number; y: number };
}

export const action = createAction<PositionChangePayload>('github.positionChange');

export const thunk = createAsyncThunk<void, PositionChangePayload, { state: RootState }>(
  action.type,
  (payload, { dispatch, getState }) => {
    try {
      const state = getState();

      const { position } = payload;

      const { id, offset } = githubSelectors.getSelect(state);

      if (!id) return;

      const card = githubSelectors.getGithubCard(id)(state);

      const updatedCard = {
        ...card,
        position: {
          x: position.x + offset.x - card.size.width / 2,
          y: position.y + offset.y - card.size.height / 2
        }
      };

      dispatch(githubActions.setCard(updatedCard));
      updateCardDebounced(id, updatedCard);
    } catch (error) {
      console.error(error);
    }
  }
);

export const positionChange = {
  thunk,
  action
};
