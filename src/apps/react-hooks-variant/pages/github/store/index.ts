import { getGithubCards, putGithubCard } from '@/utils/api';

import { createStore, emitChange } from './createStore';
import { debounce } from './debounce';

interface Store {
  cards: Array<GithubCard & { isDragging: boolean }>;
  entries: Record<GithubCard['id'], GithubCard & { isDragging: boolean }>;
  loading: boolean;
  selectedCardId: GithubCard['id'] | null;
  offset: {
    x: number;
    y: number;
  };
}

export const loadingStore = createStore<Store['loading']>('loadingStore', false);
export const cardsStore = createStore<Store['cards']>('cardsStore', []);
export const cardsEntriesStore = createStore<Store['entries']>('cardsEntriesStore', {});
export const selectedCardIdStore = createStore<Store['selectedCardId']>('selectedCardId', null);
export const offsetStore = createStore<Store['offset']>('selectedCardId', { x: 0, y: 0 });

export const fetchCards = async () => {
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
  const id = selectedCardIdStore.get();
  if (!id) return;

  const cardsEntries = cardsEntriesStore.get();
  const card = cardsEntries[id];

  const offset = offsetStore.get();

  const updatedCard = {
    ...card,
    position: {
      x: position.x + offset.x - card.size.width / 2,
      y: position.y + offset.y - card.size.height / 2
    }
  };

  cardsEntries[id] = updatedCard;

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

  cardsEntries[id] = updatedCard;

  emitChange(`cardStore.${id}`);
  updateCardDebounced(id, updatedCard);
};
