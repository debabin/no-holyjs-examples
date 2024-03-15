import type { CardEntiresProviderProps } from './context/cardEntries';
import { CardEntiresProvider } from './context/cardEntries';
import { SelectProvider } from './context/select';

interface ProvidersProps {
  children: React.ReactNode;
  cardEntries: Omit<CardEntiresProviderProps, 'children'>;
}

const Providers: React.FC<ProvidersProps> = ({ children, cardEntries }) => (
  <SelectProvider>
    <CardEntiresProvider {...cardEntries}>{children}</CardEntiresProvider>
  </SelectProvider>
);

export default Providers;
