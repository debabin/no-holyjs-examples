import { QueryClientProvider } from '@tanstack/react-query';

export interface QueryProviderProps extends React.ComponentProps<typeof QueryClientProvider> {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children, client }) => (
  <QueryClientProvider client={client}>{children}</QueryClientProvider>
);
