import type { CardEntiresProviderProps } from './context/cardEntries';

import { CardEntiresProvider } from './context/cardEntries';
import { SelectProvider } from './context/select';

interface ProvidersProps {
  cardEntries: Omit<CardEntiresProviderProps, 'children'>;
  children: React.ReactNode;
}

const Providers = ({ children, cardEntries }: ProvidersProps) => (
  <SelectProvider>
    <CardEntiresProvider {...cardEntries}>{children}</CardEntiresProvider>
  </SelectProvider>
);

export default Providers;
