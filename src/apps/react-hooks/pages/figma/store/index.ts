import { getFigmaCards } from '@/utils/api';

import { createStore, emitChange } from './createStore';

interface Store {
  cards: Array<FigmaCard & { isDragging: boolean }>;
  entries: Record<FigmaCard['id'], FigmaCard & { isDragging: boolean }>;
  select: {
    id: FigmaCard['id'] | null;
    offset: {
      x: number;
      y: number;
    };
  };
  loading: boolean;
}

export const loadingStore = createStore<Store['loading']>('loadingStore', false);
export const cardsStore = createStore<Store['cards']>('cardsStore', []);
export const cardsEntriesStore = createStore<Store['entries']>('cardsEntriesStore', {});
export const cardsSelect = createStore<Store['select']>('cardsSelect', {
  id: null,
  offset: {
    x: 0,
    y: 0
  }
});

const fetchCards = async () => {
  loadingStore.set(true);
  const getFigmaCardsResponse = await getFigmaCards();

  cardsStore.set(
    getFigmaCardsResponse.data.figmaCards.map((card) => ({
      ...card,
      isDragging: false
    }))
  );

  cardsEntriesStore.set(
    cardsStore
      .get()
      .reduce((acc, card) => ({ ...acc, [card.id]: { ...card, isDragging: false } }), {})
  );
  loadingStore.set(false);
};

export const positionChange = (position: { x: number; y: number }) => {
  const { id } = cardsSelect.get();
  if (!id) return false;

  const card = cardsEntriesStore.get()[id];

  cardsEntriesStore.set({
    ...cardsEntriesStore.get(),
    [id]: {
      ...card,
      position: {
        x: position.x + cardsSelect.get().offset.x - card.size.width / 2,
        y: position.y + cardsSelect.get().offset.y - card.size.height / 2
      }
    }
  });

  emitChange(`cardStore.${id}`);
};

fetchCards();
