import type { Page } from '@playwright/test';

import { expect } from '@playwright/test';

interface WaitToastParams {
  description?: string;
  title?: string;
}

export const waitToast = async (page: Page, params?: WaitToastParams) => {
  const toast = page.locator('[data-sonner-toast]');
  await expect(toast).toBeVisible();
  await page.waitForSelector('[data-sonner-toast][data-visible][data-mounted]');

  if (params?.title) {
    await expect(toast.locator('[data-title]')).toHaveText(params.title);
  }

  if (params?.description) {
    await expect(toast.locator('[data-description]')).toHaveText(params.description);
  }
};
