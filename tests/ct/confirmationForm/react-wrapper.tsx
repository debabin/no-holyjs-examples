import { ConfirmationForm } from '@react-hooks-variant/pages/auth/components/ConfirmationForm/ConfirmationForm';
import type { Otp } from '@react-hooks-variant/pages/auth/contexts/otp';
import { OtpProvider } from '@react-hooks-variant/pages/auth/contexts/otp';

export interface ConfirmationFormWrapperProps {
    otp: Otp;
}

export const ConfirmationFormWrapper = ({ otp }: ConfirmationFormWrapperProps) => (
    <OtpProvider defaultOtp={otp}>
        <ConfirmationForm />
    </OtpProvider>
);
