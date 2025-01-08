import { expect, test } from '@playwright/experimental-ct-react';

import { IDS } from '@/utils';

import { snapshot } from '../../helpers';

import { ConfirmationFormWrapper } from './react-wrapper';

test.describe('Confirmation form', () => {
    test('Should match the design', async ({ page, mount }) => {
        await mount(
            <ConfirmationFormWrapper
                otp={{ type: 'email', resource: 'siberiacancode@example.com', retryDelay: 120_000 }}
            />
        );

        await expect(page.getByTestId(IDS.FORM.CONFIRMATION_FORM)).toBeVisible();
        await snapshot(page, 'ConfirmationForm', `#${IDS.FORM.CONFIRMATION_FORM}`);
    });
});
