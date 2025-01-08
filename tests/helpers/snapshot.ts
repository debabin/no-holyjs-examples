import type { Page } from '@playwright/test';

import { expect } from '@playwright/test';

export const snapshot = async (page: Page, name: string, locator?: string) => {
  await page.evaluate(() => document.fonts.ready);
  const pageLocator = locator ? page.locator(locator) : page;
  expect(await pageLocator.screenshot({ animations: 'disabled' })).toMatchSnapshot([
    name,
    `${page.viewportSize()?.width}.png`
  ]);
};
