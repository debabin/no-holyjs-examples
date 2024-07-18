import { expect, test } from '@playwright/experimental-ct-react';
import { SignInForm } from '@react-hooks-variant/pages/auth/components/SignInForm/SignInForm';

import { IDS } from '@/utils';

// import { snapshot } from '../../helpers';

test.beforeEach(async ({ mount }) => mount(<SignInForm />));

// test('Should match with design', async ({ page }) => await snapshot(page, 'SignUpForm'));

test.describe('Login validation', () => {
  test('Should show validation error on empty login input', async ({ page }) => {
    await page.getByTestId(IDS.BUTTON.SIGN_IN).click();
    await expect(page.getByTestId(`${IDS.INPUT.LOGIN}-form-item-message`)).toContainText(
      'Required'
    );
  });
  // dont work
  test('Should show validation error on wrong email address', async ({ page }) => {
    await page.getByTestId(`${IDS.INPUT.LOGIN}-form-item`).fill('siberiacancode@example.com');

    await page.getByTestId(IDS.BUTTON.SIGN_IN).click();
    await expect(page.getByTestId(`${IDS.INPUT.LOGIN}-form-item-message`)).toContainText(
      'Invalid email'
    );
  });
});

test.describe('Password validation', () => {
  test('Should show validation error on empty password input', async ({ page }) => {
    await page.getByTestId(IDS.BUTTON.SIGN_IN).click();
    await expect(page.getByTestId(`${IDS.INPUT.PASSWORD}-form-item-message`)).toContainText(
      'Required'
    );
  });
});

test.describe('Password input', () => {
  test('Should hide password input if email is valid', async ({ page }) => {
    await page.getByTestId(`${IDS.INPUT.LOGIN}-form-item`).fill('siberiacancode@example.com');
    await expect(page.getByTestId(IDS.INPUT.PASSWORD)).toBeHidden();
  });

  test('Should show password input if login is valid', async ({ page }) => {
    await page.getByTestId(`${IDS.INPUT.LOGIN}-form-item`).fill('siberiacancode');
    await expect(page.getByTestId(IDS.INPUT.PASSWORD)).toBeVisible();
  });
});

test('Should send sign in request if there is no need in otp', async ({ page }) => {
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
});
