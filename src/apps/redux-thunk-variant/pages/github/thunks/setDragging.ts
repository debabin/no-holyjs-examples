import type { SagaReturnType } from 'redux-saga/effects';

import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '@/apps/redux-thunk-variant/redux/store';

import { githubActions, githubSelectors } from '../slices';

export interface SetDraggingPayload {
  id: number;
  isDragging: boolean;
}

export const action = createAction<SetDraggingPayload>('github.setDragging');

export const thunk = createAsyncThunk<void, SetDraggingPayload, { state: RootState }>(
  action.type,
  (payload, { dispatch, getState }) => {
    try {
      const state = getState();

      const { id, isDragging } = payload;

      const cardsEntries: SagaReturnType<typeof githubSelectors.getCardsEntities> =
        githubSelectors.getCardsEntities(state);

      const updatedCard = { ...cardsEntries[id], isDragging };

      dispatch(githubActions.setCard(updatedCard));
      dispatch(githubActions.setSelect({ id: isDragging ? id : null }));
    } catch (error) {
      console.error(error);
    }
  }
);

export const setDragging = {
  thunk,
  action
};
