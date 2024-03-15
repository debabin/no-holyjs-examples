import React from 'react';

export type CardEntires = Record<GithubCard['id'], GithubCard & { isDragging: boolean }>;

export interface CardEntiresContextProps {
  cardEntires: CardEntires;
  getById: (id: GithubCard['id']) => GithubCard & { isDragging: boolean };
  setCardEntires: (select: CardEntires) => void;
  incrementReaction: (id: number, reaction: string) => void;
  positionChange: (
    id: number,
    position: { x: number; y: number },
    offset: { x: number; y: number }
  ) => void;
}

export const CardEntiresContext = React.createContext<CardEntiresContextProps>({
  cardEntires: {},
  getById: () => ({}) as GithubCard & { isDragging: boolean },
  setCardEntires: () => {},
  incrementReaction: () => {},
  positionChange: () => {}
});
