import { Avatar, AvatarImage, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui/badge';

import { useGithubCard } from './hooks/useGithubCard';

interface GithubCardProps {
  id: number;
}

export const GithubCard = ({ id }: GithubCardProps) => {
  const { state, functions } = useGithubCard(id);

  return (
    <Card
      style={{
        zIndex: state.card.isDragging ? 50 : 1,
        cursor: 'pointer',
        left: `${state.card.position.x}px`,
        top: `${state.card.position.y}px`,
        width: `${state.card.size.width}px`,
        height: `${state.card.size.height}px`,
        position: 'absolute',
        userSelect: 'none'
      }}
      onMouseMove={(event) =>
        functions.positionChange({
          y: event.clientY,
          x: event.clientX
        })
      }
      onMouseDown={(event) => {
        functions.setOffset({
          x: state.card.position.x - event.clientX + state.card.size.width / 2,
          y: state.card.position.y - event.clientY + state.card.size.height / 2
        });
        functions.setDragging(true);
      }}
      onMouseUp={() => functions.setDragging(false)}
    >
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{state.card.id}</CardTitle>
        <Avatar className='h-10 w-10'>
          <AvatarImage src={state.card.image} alt={state.card.title} />
        </Avatar>
      </CardHeader>
      <CardContent>
        <div className='text-md font-bold'>{state.card.title}</div>
        <p className='text-xs text-muted-foreground'>{state.card.description}</p>

        <div className='my-2 flex gap-2'>
          {Object.entries(state.card.reactions).map(([reaction, value]) => (
            <Badge
              key={reaction}
              variant='outline'
              onClick={(event) => {
                event.stopPropagation();
                functions.incrementReaction(state.card.id, reaction);
              }}
            >
              {reaction} {value}
            </Badge>
          ))}
        </div>
        <div className='flex gap-2'>
          <div>x: {state.card.position.x}</div>
          <div>y: {state.card.position.y}</div>
        </div>
      </CardContent>
    </Card>
  );
};
