import type { RootState } from '@redux-saga-variant/redux/store';

export const getCards = (state: RootState) => state.github!.cardEntries.cards;
export const getCardsEntities = (state: RootState) => state.github!.cardEntries.entities;
export const getSelect = (state: RootState) => state.github!.select;

export const getGithubPageLoading = (state: RootState) =>
  state.api.getGithubCards.status === 'pending';

export const getGithubCard = (id: number) => (state: RootState) =>
  state.github!.cardEntries.entities[id];
