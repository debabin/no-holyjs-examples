import type { SagaReturnType } from 'redux-saga/effects';

import { createAction } from '@reduxjs/toolkit';
import { call, put, select } from 'redux-saga/effects';

import { updateCardDebounced } from '../helpers/updateCardDebounced';
import { githubActions, githubSelectors } from '../slices';

export interface IncrementReactionPayload {
  id: number;
  reaction: string;
}

export const action = createAction<IncrementReactionPayload>('github.incrementReaction');

export type IncrementReactionAction = SagaAction<typeof action.type, IncrementReactionPayload>;

export function* saga(action: IncrementReactionAction) {
  try {
    const { id, reaction } = action.payload;

    const cardsEntries: SagaReturnType<typeof githubSelectors.getCardsEntities> = yield select(
      githubSelectors.getCardsEntities
    );

    const updatedCard = {
      ...cardsEntries[id],
      reactions: {
        ...cardsEntries[id].reactions,
        [reaction]: cardsEntries[id].reactions[reaction] + 1
      }
    };

    yield put(githubActions.setCard(updatedCard));
    yield call(updateCardDebounced, id, updatedCard);
  } catch (error) {
    console.error(error);
  }
}

export const incrementReaction = {
  saga,
  action
};
