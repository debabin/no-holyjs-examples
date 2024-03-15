import { createAction } from '@reduxjs/toolkit';
import type { SagaReturnType } from 'redux-saga/effects';
import { put, select } from 'redux-saga/effects';

import { githubActions, githubSelectors } from '../slices';

export interface PositionChangePayload {
  position: { x: number; y: number };
}

export const action = createAction<PositionChangePayload>('github.positionChange');

export type PositionChangeAction = SagaAction<typeof action.type, PositionChangePayload>;

export function* saga(action: PositionChangeAction) {
  try {
    const { position } = action.payload;

    const { id, offset }: SagaReturnType<typeof githubSelectors.getSelect> = yield select(
      githubSelectors.getSelect
    );
    if (!id) return false;

    const card: SagaReturnType<ReturnType<typeof githubSelectors.getGithubCard>> = yield select(
      githubSelectors.getGithubCard(id)
    );

    const updatedCard = {
      ...card,
      position: {
        x: position.x + offset.x - card.size.width / 2,
        y: position.y + offset.y - card.size.height / 2
      }
    };

    yield put(githubActions.setCard(updatedCard));

    // updateCardDebounced(id, updatedCard);
  } catch (error) {
    console.error(error);
  }
}

export const positionChange = {
  saga,
  action
};
