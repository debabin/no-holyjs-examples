import React from 'react';

import { Avatar, AvatarImage, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui/badge';

import { cardsEntriesStore, cardsSelect } from '../store';
import { createStore } from '../store/createStore';

interface ExampleCardProps {
  id: number;
}
export const ExampleCard = ({ id }: ExampleCardProps) => {
  const cardStore = React.useMemo(
    () => createStore(`cardStore.${id}`, cardsEntriesStore.get()[id]),
    []
  );
  const card = React.useSyncExternalStore(cardStore.subscribe, () => cardsEntriesStore.get()[id]);

  const setDragging = (isDragging: boolean, offset = { x: 0, y: 0 }) => {
    const cardsEntries = cardsEntriesStore.get();
    cardsEntries[id] = { ...cardsEntries[id], isDragging };

    cardsSelect.set({
      id: isDragging ? id : null,
      offset
    });

    cardStore.set({ ...cardsEntries[id], isDragging });
  };

  return (
    <Card
      style={{
        zIndex: card.isDragging ? 100 : 1,
        cursor: 'pointer',
        left: `${card.position.x}px`,
        top: `${card.position.y}px`,
        width: `${card.size.width}px`,
        height: `${card.size.height}px`,
        position: 'absolute',
        userSelect: 'none'
      }}
      onMouseDown={(event) =>
        setDragging(true, {
          x: card.position.x - event.clientX + card.size.width / 2,
          y: card.position.y - event.clientY + card.size.height / 2
        })
      }
      onMouseUp={() => setDragging(false)}
    >
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{card.id}</CardTitle>
        <Avatar className='h-10 w-10'>
          <AvatarImage src={card.image} alt={card.title} />
        </Avatar>
      </CardHeader>
      <CardContent>
        <div className='text-md font-bold'>{card.title}</div>
        <p className='text-xs text-muted-foreground'>{card.description}</p>

        <div className='my-2 flex gap-2'>
          {Object.entries(card.reactions).map(([reaction, value]) => (
            <Badge key={reaction} variant='outline'>
              {reaction} {value}
            </Badge>
          ))}
        </div>
        <div className='flex gap-2'>
          <div>x: {card.position.x}</div>
          <div>y: {card.position.y}</div>
        </div>
      </CardContent>
    </Card>
  );
};
