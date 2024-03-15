import { takeEvery, takeLatest } from 'redux-saga/effects';

import { incrementReaction } from './incrementReaction';
import { initCards } from './initCards';
import { positionChange } from './positionChange';
import { setDragging } from './setDragging';

export function* sagas() {
  yield takeLatest(setDragging.action.type, setDragging.saga);
  yield takeLatest(initCards.action.type, initCards.saga);
  yield takeEvery(positionChange.action.type, positionChange.saga);
  yield takeEvery(incrementReaction.action.type, incrementReaction.saga);
}

export const githubSagas = {
  initCards,
  setDragging,
  positionChange,
  incrementReaction
};
