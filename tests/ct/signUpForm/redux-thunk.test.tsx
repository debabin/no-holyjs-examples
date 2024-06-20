import { expect, test } from '@playwright/experimental-ct-react';
import { SignUpForm } from '@redux-thunk-variant/pages/auth/components/SignUpForm/SignUpForm';

test('Should work SignUpForm', async ({ mount }) => {
  const component = await mount(<SignUpForm />);

  await expect(component).toContainText('Create an account');
});
