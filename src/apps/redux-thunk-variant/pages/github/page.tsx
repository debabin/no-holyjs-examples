import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

import { GithubCard, Info } from './components';
import { githubSelectors } from './slices';

export const GithubPage = () => {
  const cards = useSelector(githubSelectors.getCards);
  const loading = useSelector(githubSelectors.getGithubPageLoading);

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
