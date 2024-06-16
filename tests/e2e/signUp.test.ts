import { expect, test } from '@playwright/test';

import { IDS, ROUTES } from '@/utils';

import { waitToast } from '../helpers/waitToast';

test('Should sign up', async ({ page }) => {
  await page.goto(ROUTES.INDEX);
  await page.getByTestId(IDS.BUTTON.CREATE_NEW_ACCOUNT).click();

  //   expect(await page.screenshot()).toMatchSnapshot('SignUpForm.png');

  await page.getByTestId(IDS.INPUT.EMAIL).fill('siberia@example.com');
  await page.getByTestId(IDS.INPUT.LOGIN).fill('siberia');
  await page.getByTestId(IDS.INPUT.FIRST_NAME).fill('siberia');
  await page.getByTestId(IDS.INPUT.LAST_NAME).fill('siberia');

  await page.getByTestId(IDS.SELECT.COUNTRY).click();
  await page.getByTestId(`${IDS.SELECT.COUNTRY}-by`).click();

  await page.getByTestId(IDS.INPUT.PASSWORD).fill('siberia');
  await page.getByTestId(IDS.INPUT.PASSWORD_CONFIRMATION).fill('siberia');

  const [requestPostSignUp] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/signup')
    ),
    page.getByTestId(IDS.BUTTON.SIGN_UP).click()
  ]);

  expect(requestPostSignUp.postDataJSON()).toEqual({
    country: {
      code: 'by',
      id: 3,
      label: 'Belarus'
    },
    email: 'siberia@example.com',
    firstName: 'siberia',
    lastName: 'siberia',
    login: 'siberia',
    password: 'siberia'
  });

  await expect(page).toHaveURL(ROUTES.AUTH);

  await waitToast(page, {
    title: 'Your account has been created 👍',
    description: 'We are very glad to see you, have fun'
  });
});
