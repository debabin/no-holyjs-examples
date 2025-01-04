import type { SagaReturnType } from 'redux-saga/effects';

import { createAction } from '@reduxjs/toolkit';
import { put, select } from 'redux-saga/effects';

import { githubActions, githubSelectors } from '../slices';

export interface SetDraggingPayload {
  id: number;
  isDragging: boolean;
}

export const action = createAction<SetDraggingPayload>('github.setDragging');

export type SetDraggingAction = SagaAction<typeof action.type, SetDraggingPayload>;

export function* saga(action: SetDraggingAction) {
  try {
    const { id, isDragging } = action.payload;

    const cardsEntries: SagaReturnType<typeof githubSelectors.getCardsEntities> = yield select(
      githubSelectors.getCardsEntities
    );

    const updatedCard = { ...cardsEntries[id], isDragging };

    yield put(githubActions.setCard(updatedCard));
    yield put(githubActions.setSelect({ id: isDragging ? id : null }));
  } catch (error) {
    console.error(error);
  }
}

export const setDragging = {
  saga,
  action
};
