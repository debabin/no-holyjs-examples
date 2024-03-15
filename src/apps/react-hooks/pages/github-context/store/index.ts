import { getGithubCards, putGithubCard } from '@/utils/api';

import { createStore, emitChange } from './createStore';
import { debounce } from './debounce';

interface Store {
  cards: Array<GithubCard & { isDragging: boolean }>;
  entries: Record<GithubCard['id'], GithubCard & { isDragging: boolean }>;
  select: {
    id: GithubCard['id'] | null;
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
  const getGithubCardsResponse = await getGithubCards();

  cardsStore.set(
    getGithubCardsResponse.data.githubCards.map((card) => ({
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

const updateCard = (id: number, card: Omit<Partial<GithubCard>, 'id'>) =>
  putGithubCard({ params: { ...card, id } });

export const updateCardDebounced = debounce(updateCard, 500);

export const positionChange = (position: { x: number; y: number }) => {
  const { id } = cardsSelect.get();
  if (!id) return false;

  const cardsEntries = cardsEntriesStore.get();

  const updatedCard = {
    ...cardsEntries[id],
    position: {
      x: position.x + cardsSelect.get().offset.x - cardsEntries[id].size.width / 2,
      y: position.y + cardsSelect.get().offset.y - cardsEntries[id].size.height / 2
    }
  };

  cardsEntriesStore.set({ ...cardsEntries, [id]: updatedCard });

  emitChange(`cardStore.${id}`);
  updateCardDebounced(id, updatedCard);
};

export const incrementReaction = (id: number, reaction: string) => {
  const cardsEntries = cardsEntriesStore.get();

  const updatedCard = {
    ...cardsEntries[id],
    reactions: {
      ...cardsEntries[id].reactions,
      [reaction]: cardsEntries[id].reactions[reaction] + 1
    }
  };

  cardsEntriesStore.set({ ...cardsEntries, [id]: updatedCard });

  emitChange(`cardStore.${id}`);
  updateCardDebounced(id, updatedCard);
};

fetchCards();
