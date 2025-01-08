import { expect, test } from '@playwright/test';

import { IDS, ROUTES } from '@/utils';

import { snapshot, waitToast } from '../helpers';

test('Should sign up', async ({ page }) => {
  await page.goto(ROUTES.AUTH);

  await page.getByTestId(IDS.BUTTON.CREATE_NEW_ACCOUNT).click();

  await snapshot(page, 'SignUpForm');

  await page.getByTestId(`${IDS.INPUT.EMAIL}-form-item`).fill('siberia@example.com');
  await page.getByTestId(`${IDS.INPUT.LOGIN}-form-item`).fill('siberia');
  await page.getByTestId(`${IDS.INPUT.FIRST_NAME}-form-item`).fill('siberia');
  await page.getByTestId(`${IDS.INPUT.LAST_NAME}-form-item`).fill('siberia');

  await page.getByTestId(IDS.SELECT.COUNTRY).click();
  await page.getByTestId(`${IDS.SELECT.COUNTRY}-by`).click();

  await page.getByTestId(`${IDS.INPUT.PASSWORD}-form-item`).fill('siberia');
  await page.getByTestId(`${IDS.INPUT.PASSWORD_CONFIRMATION}-form-item`).fill('siberia');

  const [requestPostSignUp] = await Promise.all([
    page.waitForRequest(
      (request) => request.method() === 'POST' && request.url().includes('/signup')
    ),
    page.getByTestId(IDS.BUTTON.SIGN_UP).click(),
    page.waitForResponse((response) => response.url().includes('/signup'))
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
  await snapshot(page, 'Profile');
});
