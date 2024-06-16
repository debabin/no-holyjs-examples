import { expect, test } from '@playwright/test';

import { IDS, ROUTES } from '@/utils';

import { waitToast } from '../../helpers/waitToast';

test('Should sign up', async ({ page }) => {
  await page.goto(ROUTES.INDEX);

  // expect(await page.screenshot()).toMatchSnapshot('SignInForm.png');

  await page.getByTestId(IDS.INPUT.LOGIN).fill('siberiacancode@example.com');
  const [requestPostOtpEmail] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/otp/email')
    ),
    page.getByTestId(IDS.BUTTON.SIGN_IN).click()
  ]);

  expect(requestPostOtpEmail.postDataJSON()).toEqual({
    email: 'siberiacancode@example.com'
  });

  // expect(await page.screenshot()).toMatchSnapshot('ConfirmationForm.png');

  await page.getByTestId(IDS.INPUT.OTP).fill('123456');
  const [requestPostTwoFactorAuthentication] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/twoFactorAuthentication')
    ),
    page.getByTestId(IDS.BUTTON.CONFIRM).click()
  ]);

  expect(requestPostTwoFactorAuthentication.postDataJSON()).toEqual({
    otp: '123456',
    source: 'siberiacancode@example.com'
  });

  await expect(page).toHaveURL(ROUTES.INDEX);
  // expect(await page.screenshot()).toMatchSnapshot('Profile.png');

  await waitToast(page, {
    title: 'Sign in is successful 👍',
    description: 'We are very glad to see you, have fun'
  });
});
