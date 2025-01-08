import { ConfirmationForm } from '@react-hooks-variant/pages/auth/components/ConfirmationForm/ConfirmationForm';
import type { Otp } from '@react-hooks-variant/pages/auth/contexts/otp';
import { createCtx } from '@reatom/framework';
import { reatomContext as ReatomContext } from '@reatom/npm-react';

export interface ConfirmationFormWrapperProps {
    otp: Otp;
}

export const ctx = createCtx();

export const ConfirmationFormWrapper = () => (
    <ReatomContext.Provider value={ctx}>
        <ConfirmationForm />
    </ReatomContext.Provider>
);
