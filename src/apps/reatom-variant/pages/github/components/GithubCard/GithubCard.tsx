import type { MouseEventHandler } from 'react';
import { useRef } from 'react';
import { reatomComponent } from '@reatom/npm-react';
import type { GithubCardModel } from '@reatom-variant/pages/github/model';
import { dragging } from '@reatom-variant/pages/github/model';

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
    dragging(ctx, card);
    prevCoordRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    dragging(ctx, null);
    prevCoordRef.current = null;
  };

  return (
    <Card
      style={{
        zIndex: ctx.spy(card.isDragging) ? 50 : 1,
        cursor: 'pointer',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${card.size.width}px`,
        height: `${card.size.height}px`,
        position: 'absolute',
        userSelect: 'none'
      }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseLeave}
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
