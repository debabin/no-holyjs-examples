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

  await page.getByTestId(IDS.RADIO_BUTTON.PHONE).click();
  await page.getByTestId(IDS.CHECKBOX.TERMS).click();
  await page.getByTestId(IDS.BUTTON.CONTINUE).click();

  // expect(await page.screenshot()).toMatchSnapshot('ConfirmationFormPhoneToOtp.png');

  await page.getByTestId(IDS.INPUT.PHONE).fill('1231231231');

  const [requestPostOtpPhone] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/otp/phone')
    ),
    page.getByTestId(IDS.BUTTON.CONFIRM).click()
  ]);

  expect(requestPostOtpPhone.postDataJSON()).toEqual({
    phone: '+7 123 123 1231'
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
    source: '+7 123 123 1231'
  });

  await expect(page).toHaveURL(ROUTES.INDEX);
  // expect(await page.screenshot()).toMatchSnapshot('Profile.png');

  await waitToast(page, {
    title: 'Sign in is successful 👍',
    description: 'We are very glad to see you, have fun'
  });
});
