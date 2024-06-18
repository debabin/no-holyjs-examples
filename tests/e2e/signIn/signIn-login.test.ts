import { expect, test } from '@playwright/test';

import { IDS, ROUTES } from '@/utils';

import { waitToast } from '../../helpers/waitToast';

test('Should sign in with login', async ({ page }) => {
  await page.goto(ROUTES.INDEX);

  // expect(await page.screenshot()).toMatchSnapshot('SignInForm.png');

  await page.getByTestId(IDS.INPUT.LOGIN).fill('siberiacancode');
  await page.getByTestId(IDS.INPUT.PASSWORD).fill('123456');

  const [requestPostSignInLogin] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/signin/login')
    ),
    page.getByTestId(IDS.BUTTON.SIGN_IN).click()
  ]);

  expect(requestPostSignInLogin.postDataJSON()).toEqual({
    login: 'siberiacancode',
    password: '123456'
  });

  // expect(await page.screenshot()).toMatchSnapshot('Profile.png');

  await waitToast(page, {
    title: 'Sign in is successful 👍',
    description: 'We are very glad to see you, have fun'
  });
});
