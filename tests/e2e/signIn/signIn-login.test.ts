import { expect, test } from '@playwright/test';

import { IDS, ROUTES } from '@/utils';

import { snapshot, waitToast } from '../../helpers';

test('Should sign in login', async ({ page }) => {
  await page.goto(ROUTES.AUTH);

  await expect(page.getByTestId(IDS.PAGE.AUTH)).toBeVisible();

  await snapshot(page, 'SignInForm');

  await page.getByTestId(`${IDS.INPUT.LOGIN}-form-item`).fill('siberiacancode');
  await page.getByTestId(`${IDS.INPUT.PASSWORD}-form-item`).fill('123456');

  const [requestPostSignInLogin] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/signin/login')
    ),
    page.getByTestId(IDS.BUTTON.SIGN_IN).click(),
    page.waitForResponse((response) => response.url().includes('/signin/login'))
  ]);

  expect(requestPostSignInLogin.postDataJSON()).toEqual({
    login: 'siberiacancode',
    password: '123456'
  });

  await expect(page).toHaveURL(ROUTES.INDEX);
  await expect(page.getByTestId(IDS.PAGE.INDEX)).toBeVisible();
  await waitToast(page, {
    title: 'Sign in is successful 👍',
    description: 'We are very glad to see you, have fun'
  });
  await snapshot(page, 'Profile');
});
