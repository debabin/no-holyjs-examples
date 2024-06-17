import { expect, test } from '@playwright/test';

import { IDS, ROUTES } from '@/utils';

import { waitToast } from '../../helpers/waitToast';

test('Should sign in with email', async ({ page }) => {
  await page.goto(ROUTES.INDEX);

  // expect(await page.screenshot()).toMatchSnapshot('SignInForm.png');

  await page.getByTestId(IDS.INPUT.LOGIN).fill('siberiacancodeotp');
  await page.getByTestId(IDS.INPUT.PASSWORD).fill('123456');

  const [requestPostSignInLogin] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/signin/login')
    ),
    page.getByTestId(IDS.BUTTON.SIGN_IN).click()
  ]);

  expect(requestPostSignInLogin.postDataJSON()).toEqual({
    login: 'siberiacancodeotp',
    password: '123456'
  });

  // expect(await page.screenshot()).toMatchSnapshot('SelectConfirmationForm.png');

  await page.getByTestId(IDS.RADIO_BUTTON.EMAIL).click();
  await page.getByTestId(IDS.CHECKBOX.TERMS).click();
  await page.getByTestId(IDS.BUTTON.CONTINUE).click();

  // expect(await page.screenshot()).toMatchSnapshot('ConfirmationFormEmailToOtp.png');

  await page.getByTestId(IDS.INPUT.EMAIL).fill('siberiacancode@example.com');

  const [requestPostOtpEmail] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/otp/email')
    ),
    page.getByTestId(IDS.BUTTON.CONFIRM).click()
  ]);

  expect(requestPostOtpEmail.postDataJSON()).toEqual({
    email: 'siberiacancode@example.com'
  });

  // expect(await page.screenshot()).toMatchSnapshot('ConfirmationFormOtp.png');

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
