import type { StageProviderProps } from './contexts/stage';
import { StageProvider } from './contexts/stage';

interface ProvidersProps {
  children: React.ReactNode;
  stage: Omit<StageProviderProps, 'children'>;
}

const Providers: React.FC<ProvidersProps> = ({ children, stage }) => (
  <StageProvider {...stage}>{children}</StageProvider>
);

export default Providers;
