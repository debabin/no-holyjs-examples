import React from 'react';

import {
  cardsEntriesStore,
  incrementReaction,
  offsetStore,
  positionChange,
  selectedCardIdStore
} from '../../../store';
import { computedStore } from '../../../store/createStore';
import { useStore } from '../../../store/useStore';

export const useGithubCard = (id: number) => {
  const cardStore = React.useMemo(
    () => computedStore(`cardStore.${id}`, () => cardsEntriesStore.get()[id]),
    []
  );
  const card = useStore(cardStore);

  const setDragging = (isDragging: boolean) => {
    const cardsEntries = cardsEntriesStore.get();
    cardsEntries[id] = { ...cardsEntries[id], isDragging };

    selectedCardIdStore.set(isDragging ? id : null);
  };

  const setOffset = (offset: { x: number; y: number }) => offsetStore.set(offset);

  return {
    state: { card },
    functions: { setDragging, incrementReaction, positionChange, setOffset }
  };
};
