import { useSignInForm } from '@react-hooks-variant/pages/auth/components/SignInForm/hooks/useSignInForm';
import { act, renderHook } from '@testing-library/react';
import { startRestMockServer } from 'mock-config-server';

import AuthProviders from '@/apps/react-hooks-variant/pages/auth/providers';

import { Providers } from '../utils/setup';
import { POST_OTP_EMAIL_RESPONSE } from './constants/data';

vi.mock('axios');
vi.mock('@tanstack/react-router');

const wrapper = (props: { children: React.ReactNode }) => (
  <Providers>
    <AuthProviders stage={{ defaultStage: 'signIn' }} {...props} />
  </Providers>
);

it('Should submit for email', async () => {
  const server = await startRestMockServer({
    configs: [{ method: 'post', path: '/otp/email', routes: [{ data: POST_OTP_EMAIL_RESPONSE }] }]
  });

  const useSignInFormHook = renderHook(useSignInForm, {
    wrapper
  });

  act(async () => {
    await useSignInFormHook.result.current.form.setValue('login', 'siberiacancode@example.com');
  });

  // await useSignInFormHook.result.current.functions.onSubmit();
  // expect(axios.post).toHaveBeenCalledWith('/otp/email');
  server.destroy();
});
