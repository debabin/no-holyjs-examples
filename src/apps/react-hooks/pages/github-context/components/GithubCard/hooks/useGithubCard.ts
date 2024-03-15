import { useCardEntries } from '../../../context/cardEntries';
import { useSelect } from '../../../context/select';

export const useGithubCard = (id: number) => {
  const { setSelect } = useSelect();
  const { getById, setCardEntires, cardEntires, incrementReaction, positionChange } =
    useCardEntries();

  const card = getById(id);

  const setDragging = (isDragging: boolean, offset = { x: 0, y: 0 }) => {
    setCardEntires({ ...cardEntires, [id]: { ...card, isDragging } });

    setSelect({
      id: isDragging ? id : null,
      offset
    });
  };

  return { state: { card }, functions: { setDragging, incrementReaction, positionChange } };
};
