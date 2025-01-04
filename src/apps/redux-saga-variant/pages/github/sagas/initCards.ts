import type { SagaReturnType } from 'redux-saga/effects';

import { createAction } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';

import { apiSlice } from '@/apps/redux-saga-variant/redux/api';

import { githubActions } from '../slices';

export const action = createAction('github.initCards');

export function* saga() {
  try {
    const getGithubCardsResponse: SagaReturnType<
      typeof apiSlice.endpoints.getGithubCards.initiate
    > = yield call(apiSlice.endpoints.getGithubCards.initiate);

    yield put(githubActions.setCards(getGithubCardsResponse.data.githubCards));
  } catch (error) {
    console.error(error);
  }
}

export const initCards = {
  saga,
  action
};
