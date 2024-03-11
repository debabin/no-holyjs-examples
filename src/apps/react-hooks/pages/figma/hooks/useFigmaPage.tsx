import { cardsStore, loadingStore, positionChange } from '../store';
import { useStore } from '../store/useStore';

export const useFigmaPage = () => {
  const cards = useStore(cardsStore);
  const loading = useStore(loadingStore);

  return { state: { cards, loading }, functions: { onSelect: () => {}, positionChange } };
};
