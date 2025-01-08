import { expect, test } from '@playwright/experimental-ct-react';
import { SignUpForm } from '@react-hooks-variant/pages/auth/components/SignUpForm/SignUpForm';

import { IDS } from '@/utils';

test.describe('Email validation', () => {
  test.beforeEach(async ({ mount }) => mount(<SignUpForm />));

  test('Should show "required" error', async ({ page }) => {
    await page.getByTestId(IDS.BUTTON.SIGN_UP).click();
    await expect(page.getByTestId(`${IDS.INPUT.EMAIL}-form-item-message`)).toContainText(
      'Required'
    );
  });

  test('Should show "invalid email" error', async ({ page }) => {
    page.getByTestId(`${IDS.INPUT.EMAIL}-form-item`).fill('not email');
    await page.getByTestId(IDS.BUTTON.SIGN_UP).click();
    await expect(page.getByTestId(`${IDS.INPUT.EMAIL}-form-item-message`)).toContainText(
      'Invalid email address'
    );
  });
});
