import { ExampleCard } from './components/Card';
import { useFigmaPage } from './hooks/useFigmaPage';

export const FigmaPage = () => {
  const { state, functions } = useFigmaPage();

  return (
    <>
      {/* <div>
        <div className='flex items-center justify-between'>
          <div className='text-3xl font-bold'>Figma {state.cards.length}</div>
        </div>
        <Button variant='outline' onClick={cardsStore.addCard}>
          Add
        </Button>
      </div> */}
      <div
        className='relative h-screen w-full'
        onMouseMove={(event) =>
          functions.positionChange({
            y: event.clientY,
            x: event.clientX
          })
        }
      >
        {state.loading && <div>loading</div>}
        {state.cards.map((card) => (
          <ExampleCard key={card.id} id={card.id} />
        ))}
      </div>
    </>
  );
};
