import React from 'react';

import { cardsEntriesStore, cardsSelect, incrementReaction, positionChange } from '../../../store';
import { computedStore } from '../../../store/createStore';
import { useStore } from '../../../store/useStore';

export const useGithubCard = (id: number) => {
  const cardStore = React.useMemo(
    () => computedStore(`cardStore.${id}`, () => cardsEntriesStore.get()[id]),
    []
  );
  const card = useStore(cardStore);

  const setDragging = (isDragging: boolean, offset = { x: 0, y: 0 }) => {
    const cardsEntries = cardsEntriesStore.get();
    cardsEntries[id] = { ...cardsEntries[id], isDragging };

    cardsSelect.set({
      id: isDragging ? id : null,
      offset
    });
  };

  return { state: { card }, functions: { setDragging, incrementReaction, positionChange } };
};
