import { Loader2 } from 'lucide-react';

import type { CardEntires } from './context/cardEntries';

import { useGetGithubCardsQuery } from '../../utils/api';
import { GithubCard, Info } from './components';
import Providers from './providers';

export const GithubContextPage = () => {
  const getGithubCardsQuery = useGetGithubCardsQuery();

  if (getGithubCardsQuery.isPending || !getGithubCardsQuery.data) {
    return (
      <div className='relative h-screen w-full'>
        <div className='flex h-full items-center justify-center'>
          <Loader2 className='size-6 animate-spin' />
        </div>
      </div>
    );
  }

  const cards = getGithubCardsQuery.data.data.githubCards;
  const cardsEntries = cards.reduce(
    (acc, card) => ({ ...acc, [card.id]: { ...card, isDragging: false } }),
    {} as CardEntires
  );

  return (
    <Providers cardEntries={{ defaultCardEntires: cardsEntries }}>
      <div className='relative h-screen w-full'>
        {cards.map((card) => (
          <GithubCard key={card.id} id={card.id} />
        ))}
      </div>
      {!!cards.length && <Info />}
    </Providers>
  );
};
