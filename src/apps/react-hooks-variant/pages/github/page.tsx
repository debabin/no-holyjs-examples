import { Loader2 } from 'lucide-react';

import { GithubCard, Info } from './components';
import { cardsStore, loadingStore } from './store';
import { useStore } from './store/useStore';

export const GithubPage = () => {
  const cards = useStore(cardsStore);
  const loading = useStore(loadingStore);

  return (
    <>
      <div className='relative h-screen w-full'>
        {loading && (
          <div className='flex h-full items-center justify-center'>
            <Loader2 className='size-6 animate-spin' />
          </div>
        )}
        {cards.map((card) => (
          <GithubCard key={card.id} id={card.id} />
        ))}
      </div>
      {!!cards.length && <Info />}
    </>
  );
};
