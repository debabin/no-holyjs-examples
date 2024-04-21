import React from 'react';

import { Button } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { cardsEntriesStore, cardsStore, incrementReaction, selectedCardIdStore } from '../../store';
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
  const selectedCardId = useStore(selectedCardIdStore);

  return (
    <div className='absolute left-5 top-20'>
      <div className='flex items-center gap-4'>
        <div>
          <h1 className='text-2xl font-medium'>Github cards</h1>
          <ReactionCount />
        </div>

        <Sheet>
          <SheetTrigger>
            <Button>Open</Button>
          </SheetTrigger>
          <SheetContent className='flex justify-center overflow-y-auto p-4 sm:max-w-[450px]'>
            <SheetHeader>
              <SheetTitle>Cards</SheetTitle>
              <div className='flex flex-col gap-2'>
                {cards.map((card) => (
                  <CardInfo key={card.id} id={card.id} />
                ))}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {selectedCardId && (
        <p className='text-sm'>
          selected: <b>{selectedCardId}</b>
        </p>
      )}
    </div>
  );
};
