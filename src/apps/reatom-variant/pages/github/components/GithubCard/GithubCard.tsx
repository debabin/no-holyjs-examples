import type { GithubCardModel } from '@reatom-variant/pages/github/model';
import type { MouseEventHandler } from 'react';

import { draggingAtom } from '@reatom-variant/pages/github/model';
import { reatomComponent } from '@reatom/npm-react';
import { useRef } from 'react';

import { Avatar, AvatarImage, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui/badge';

interface GithubCardProps {
  card: GithubCardModel;
}

export const GithubCard = reatomComponent<GithubCardProps>(({ ctx, card }) => {
  const prevCoordRef = useRef<{ x: number; y: number } | null>(null);
  const position = ctx.spy(card.position);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (prevCoordRef.current === null) return;

    card.position(ctx, {
      x: position.x - prevCoordRef.current.x + event.clientX,
      y: position.y - prevCoordRef.current.y + event.clientY
    });

    prevCoordRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    draggingAtom(ctx, card);
    prevCoordRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    draggingAtom(ctx, null);
    prevCoordRef.current = null;
  };

  return (
    <Card
      style={{
        zIndex: ctx.spy(card.isDraggingAtom) ? 50 : 1,
        cursor: 'pointer',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${card.size.width}px`,
        height: `${card.size.height}px`,
        position: 'absolute',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseLeave}
    >
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{card.id}</CardTitle>
        <Avatar className='h-10 w-10'>
          <AvatarImage alt={card.title} src={card.image} />
        </Avatar>
      </CardHeader>
      <CardContent>
        <div className='text-md font-bold'>{card.title}</div>
        <p className='text-xs text-muted-foreground'>{card.description}</p>

        <div className='my-2 flex gap-2'>
          {Object.entries(ctx.spy(card.reactions)).map(([reaction, value]) => (
            <Badge
              key={reaction}
              variant='outline'
              onClick={(event) => {
                event.stopPropagation();
                card.incrementReaction(ctx, reaction);
              }}
            >
              {reaction} {value}
            </Badge>
          ))}
        </div>
        <div className='flex gap-2'>
          <div>x: {position.x}</div>
          <div>y: {position.y}</div>
        </div>
      </CardContent>
    </Card>
  );
}, 'GithubCard');
