import type { StageProviderProps } from './contexts/stage';

import { OtpProvider } from './contexts/otp';
import { StageProvider } from './contexts/stage';

interface ProvidersProps {
  children: React.ReactNode;
  stage: Omit<StageProviderProps, 'children'>;
}

const Providers = ({ children, stage }: ProvidersProps) => (
  <StageProvider {...stage}>
    <OtpProvider>{children}</OtpProvider>
  </StageProvider>
);

export default Providers;
