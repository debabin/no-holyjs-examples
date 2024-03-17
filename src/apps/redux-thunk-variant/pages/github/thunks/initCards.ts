import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { apiSlice } from '@/apps/redux-thunk-variant/redux/api';

import { githubActions } from '../slices';

export const action = createAction('github.initCards');

export const thunk = createAsyncThunk(action.type, async (_, { dispatch }) => {
  try {
    const getGithubCardsResponse = await apiSlice.endpoints.getGithubCards.initiate();

    dispatch(githubActions.setCards(getGithubCardsResponse.data.githubCards));
  } catch (error) {
    console.error(error);
  }
});

export const initCards = {
  thunk,
  action
};
