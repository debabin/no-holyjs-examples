import { expect, test } from '@playwright/test';

import { IDS, ROUTES } from '@/utils';

import { disableAnimation, snapshot, waitToast } from '../../helpers';

test('Should sign in login with phone otp', async ({ page }) => {
  await page.goto(ROUTES.AUTH);
  await disableAnimation(page);

  await expect(page.getByTestId(IDS.PAGE.AUTH)).toBeVisible();

  await snapshot(page, 'SignInForm');

  await page.getByTestId(IDS.INPUT.LOGIN).fill('siberiacancodeotp');
  await page.getByTestId(IDS.INPUT.PASSWORD).fill('123456');

  const [requestPostSignInLogin] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/signin/login')
    ),
    page.getByTestId(IDS.BUTTON.SIGN_IN).click(),
    page.waitForResponse((response) => response.url().includes('/signin/login'))
  ]);

  expect(requestPostSignInLogin.postDataJSON()).toEqual({
    login: 'siberiacancodeotp',
    password: '123456'
  });

  await snapshot(page, 'SelectConfirmationForm');

  await page.getByTestId(IDS.RADIO_BUTTON.PHONE).click();
  await page.getByTestId(IDS.CHECKBOX.TERMS).click();
  await page.getByTestId(IDS.BUTTON.CONTINUE).click();

  await snapshot(page, 'ConfirmationFormPhoneToOtp');

  await page.getByTestId(IDS.INPUT.PHONE).fill('1231231231');

  const [requestPostOtpPhone] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/otp/phone')
    ),
    page.getByTestId(IDS.BUTTON.CONFIRM).click(),
    page.waitForResponse((response) => response.url().includes('/otp/phone'))
  ]);

  expect(requestPostOtpPhone.postDataJSON()).toEqual({
    phone: '+7 123 123 1231'
  });

  await snapshot(page, 'ConfirmationFormOtp');

  await page.getByTestId(IDS.INPUT.OTP).fill('123456');
  const [requestPostTwoFactorAuthentication] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/twoFactorAuthentication')
    ),
    page.getByTestId(IDS.BUTTON.CONFIRM).click(),
    page.waitForResponse((response) => response.url().includes('/twoFactorAuthentication'))
  ]);

  expect(requestPostTwoFactorAuthentication.postDataJSON()).toEqual({
    otp: '123456',
    source: '+7 123 123 1231'
  });

  await expect(page).toHaveURL(ROUTES.INDEX);
  await expect(page.getByTestId(IDS.PAGE.INDEX)).toBeVisible();
  await waitToast(page, {
    title: 'Sign in is successful 👍',
    description: 'We are very glad to see you, have fun'
  });
  await snapshot(page, 'Profile');
});
