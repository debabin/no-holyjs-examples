import { putGithubCard } from '@/utils/api';

import { debounce } from './debounce';

const updateCard = (id: number, card: Omit<Partial<GithubCard>, 'id'>) =>
  putGithubCard({ params: { ...card, id } });

export const updateCardDebounced = debounce(updateCard, 500);
