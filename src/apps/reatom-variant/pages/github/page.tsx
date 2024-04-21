import { reatomComponent } from '@reatom/npm-react';
import { fetchCards } from '@reatom-variant/pages/github/model';
import { Loader2 } from 'lucide-react';

import { GithubCard, Info } from './components';

export const GithubPage = reatomComponent(({ ctx }) => {
  const cards = ctx.spy(fetchCards.dataAtom);
  const loading = ctx.spy(fetchCards.loading);

  return (
    <>
      <div className='relative h-screen w-full'>
        {loading && (
          <div className='flex h-full items-center justify-center'>
            <Loader2 className='size-6 animate-spin' />
          </div>
        )}
        {cards.map((card) => (
          <GithubCard key={card.id} card={card} />
        ))}
      </div>
      {!!cards.length && <Info />}
    </>
  );
}, 'GithubPage');
