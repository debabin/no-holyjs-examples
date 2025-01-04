import type { PayloadAction } from '@reduxjs/toolkit';

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const cardEntriesAdapter = createEntityAdapter({
  selectId: (githubCard: GithubCard & { isDragging: boolean }) => githubCard.id
});

export interface CardEntriesState {
  cards: GithubCard[];
}

const initialState: CardEntriesState = {
  cards: []
};

export const cardEntriesSlice = createSlice({
  name: 'cardEntries',
  initialState: cardEntriesAdapter.getInitialState(initialState),
  reducers: {
    setCard: (state, action: PayloadAction<GithubCard & { isDragging: boolean }>) => {
      state.entities[action.payload.id] = action.payload;
    },
    setCards: (state, action: PayloadAction<GithubCard[]>) => {
      cardEntriesAdapter.setAll(
        state,
        action.payload.map((card) => ({ ...card, isDragging: false }))
      );
      state.cards = action.payload;
    }
  }
});
