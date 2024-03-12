import React from 'react';

import { Button } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { cardsEntriesStore, cardsSelect, cardsStore, incrementReaction } from '../../store';
import { computedStore } from '../../store/createStore';
import { useStore } from '../../store/useStore';

interface CardInfoProps {
  id: number;
}

const CardInfo = ({ id }: CardInfoProps) => {
  const cardStore = React.useMemo(
    () => computedStore(`cardStore.${id}`, () => cardsEntriesStore.get()[id]),
    []
  );
  const card = useStore(cardStore);

  return (
    <div className='my-2 flex gap-2'>
      {card.title}
      {Object.entries(card.reactions).map(([reaction, value]) => (
        <Badge
          key={reaction}
          className='cursor-pointer select-none'
          variant='outline'
          onClick={() => incrementReaction(card.id, reaction)}
        >
          {reaction} {value}
        </Badge>
      ))}
    </div>
  );
};

const ReactionCount = () => {
  const cardsEntries = useStore(cardsEntriesStore);

  const reactionsCount = Object.values(cardsEntries).reduce((acc, cardsEntry) => {
    return acc + Object.values(cardsEntry.reactions).reduce((acc, value) => acc + value, 0);
  }, 0);

  return (
    <p className='text-sm'>
      reactions count: <b>{reactionsCount}</b>
    </p>
  );
};

export const Info = () => {
  const cards = useStore(cardsStore);
  const cardSelect = useStore(cardsSelect);

  return (
    <div className='absolute left-5 top-20'>
      <div className='flex gap-2'>
        <h1 className='text-2xl font-medium'>FigmaCards</h1>
        <Sheet>
          <SheetTrigger>
            <Button size='sm'>Open</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Cards</SheetTitle>
              <div className='absolute right-10 top-20 z-[1000] h-full bg-white'>
                {cards.map((card) => (
                  <CardInfo key={card.id} id={card.id} />
                ))}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <ReactionCount />
      {cardSelect.id && (
        <p className='text-sm'>
          selected: <b>{cardSelect.id}</b>
        </p>
      )}
    </div>
  );
};
