import React from 'react';

import { putGithubCard } from '@/utils/api';

import type { CardEntires } from './CardEntriesContext';

import { debounce } from '../../utils/helpers/debounce';
import { useSelect } from '../select';
import { CardEntiresContext } from './CardEntriesContext';

export interface CardEntiresProviderProps {
  children: React.ReactNode;
  defaultCardEntires: CardEntires;
}

export const CardEntiresProvider = ({ children, defaultCardEntires }: CardEntiresProviderProps) => {
  const { select } = useSelect();
  const [cardEntires, setCardEntires] = React.useState<CardEntires>(defaultCardEntires);

  const getById = (id: GithubCard['id']) => cardEntires[id];

  const updateCard = (id: number, card: Omit<Partial<GithubCard>, 'id'>) =>
    putGithubCard({ params: { ...card, id } });

  const updateCardDebounced = React.useMemo(() => debounce(updateCard, 500), []);

  const positionChange = (position: { x: number; y: number }) => {
    if (!select.id) return;
    const card = getById(select.id);

    const updatedCard = {
      ...card,
      position: {
        x: position.x + select.offset.x - card.size.width / 2,
        y: position.y + select.offset.y - card.size.height / 2
      }
    };

    setCardEntires({
      ...cardEntires,
      [select.id]: updatedCard
    });

    updateCardDebounced(select.id, updatedCard);
  };

  const incrementReaction = (id: number, reaction: string) => {
    const card = getById(id);

    const updatedCard = {
      ...card,
      reactions: {
        ...card.reactions,
        [reaction]: card.reactions[reaction] + 1
      }
    };

    setCardEntires({
      ...cardEntires,
      [id]: updatedCard
    });

    updateCardDebounced(id, updatedCard);
  };

  const value = React.useMemo(
    () => ({ cardEntires, setCardEntires, getById, incrementReaction, positionChange }),
    [cardEntires]
  );

  return <CardEntiresContext.Provider value={value}>{children}</CardEntiresContext.Provider>;
};
