import { OtpProvider } from './contexts/otp';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => <OtpProvider>{children}</OtpProvider>;

export default Providers;
