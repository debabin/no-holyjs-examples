import { Provider as ReactReduxProvider } from 'react-redux';

import { ThemeContainer } from './redux/slices/theme/container';
import { store } from './redux/store';

export interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ReactReduxProvider store={store}>
      <ThemeContainer>{children}</ThemeContainer>
    </ReactReduxProvider>
  );
};

export default Providers;
