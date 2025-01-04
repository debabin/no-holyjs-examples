import { fetchProfile, sessionAtom, tokenAtom } from '@reatom-variant/model';
import { router } from '@reatom-variant/router';
import { atom, reatomAsync, withAssign } from '@reatom/framework';
import { reatomTimer } from '@reatom/timer';
import { toast } from 'sonner';

import {
  postOtpEmail,
  postOtpPhone,
  postSignInLogin,
  postSignUp,
  postTwoFactorAuthentication
} from '@/utils/api/requests';

export type Stage = 'confirmation' | 'selectConfirmation' | 'signIn' | 'signUp';

export const stageAtom = atom<{ value: Stage }>({ value: 'signIn' }, 'stageAtom');

export const otpAtom = atom<{ type: 'email' | 'phone'; resource: string; retryDelay: number }>(
  {
    type: 'email',
    resource: '',
    retryDelay: 0
  },
  'otpAtom'
).pipe(
  withAssign((_, name) => ({
    // eslint-disable-next-line @reatom/reatom-prefix-rule
    countdown: reatomTimer({
      name: `${name}.countdown`,
      interval: 1000,
      delayMultiplier: 1000,
      progressPrecision: 2,
      resetProgress: true
    })
  })),
  withAssign((original, name) => ({
    resend: reatomAsync(async (ctx) => {
      try {
        const otp = ctx.get(original);
        const postOtp = otp.type === 'email' ? postOtpEmail : postOtpPhone;

        const postOtpResponse = await postOtp({
          params: { [otp.type]: otp.resource } as Record<'email' | 'phone', string>
        });

        if (postOtpResponse.data.retryDelay) {
          original.countdown.startTimer(ctx, postOtpResponse.data.retryDelay / 1000);

          original(ctx, {
            ...otp,
            retryDelay: postOtpResponse.data.retryDelay
          });

          stageAtom(ctx, { value: 'confirmation' });
        }
      } catch (error) {
        console.error(error);
      }
    }, `${name}.otpResend`)
  }))
);

export const signInSubmit = reatomAsync(
  async (
    ctx,
    payload: {
      resource: 'email' | 'login';
      values: { login: string; password?: string };
    }
  ) => {
    try {
      const { resource, values } = payload;
      if (resource === 'email') {
        const postOtpEmailResponse = await postOtpEmail({
          params: { email: values.login }
        });

        if (!postOtpEmailResponse.data.retryDelay) return;

        otpAtom(ctx, {
          type: 'email',
          resource: values.login,
          retryDelay: postOtpEmailResponse.data.retryDelay
        });

        otpAtom.countdown.startTimer(ctx, postOtpEmailResponse.data.retryDelay / 1000);
        stageAtom(ctx, { value: 'confirmation' });
        return;
      }

      const postSignInLoginResponse = await postSignInLogin({
        params: {
          [resource]: values.login,
          ...(resource === 'login' && { password: values.password })
        } as Record<'email' | 'login', string>
      });

      if (
        'needConfirmation' in postSignInLoginResponse.data &&
        postSignInLoginResponse.data.needConfirmation &&
        resource === 'login'
      ) {
        stageAtom(ctx, { value: 'selectConfirmation' });
        return;
      }

      if ('profile' in postSignInLoginResponse.data) {
        tokenAtom(ctx, postSignInLoginResponse.data.token);
        fetchProfile.dataAtom(ctx, postSignInLoginResponse.data.profile);
        sessionAtom(ctx, { isAuthenticated: true });

        toast.success('Sign in is successful 👍', {
          cancel: { label: 'Close' },
          description: 'We are very glad to see you, have fun'
        });

        router.navigate({
          to: '/',
          replace: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  'signInSubmit'
).pipe(
  withAssign((original, name) => ({
    loadingAtom: atom((ctx) => ctx.spy(original.pendingAtom) > 0, `${name}.loading`)
  }))
);

export const selectConfirmationSubmit = reatomAsync(async (ctx, payload) => {
  try {
    const { values, selectedResource } = payload;

    const postOtp = selectedResource === 'email' ? postOtpEmail : postOtpPhone;
    const postOtpApiResponse = await postOtp({
      params: { [selectedResource]: values.resource } as Record<'email' | 'phone', string>
    });
    if (postOtpApiResponse.data.retryDelay) {
      otpAtom(ctx, {
        type: selectedResource,
        resource: values.resource,
        retryDelay: postOtpApiResponse.data.retryDelay
      });
      otpAtom.countdown.startTimer(ctx, postOtpApiResponse.data.retryDelay / 1000);
      stageAtom(ctx, { value: 'confirmation' });
    }
  } catch (error) {
    console.error(error);
  }
}, 'selectConfirmationSubmit').pipe(
  withAssign((original, name) => ({
    loadingAtom: atom((ctx) => ctx.spy(original.pendingAtom) > 0, `${name}.loading`)
  }))
);

export const confirmationSubmit = reatomAsync(async (ctx, payload) => {
  const { values } = payload;
  const postTwoFactorAuthenticationResponse = await postTwoFactorAuthentication({
    params: {
      otp: values.otp,
      source: ctx.get(otpAtom).resource
    }
  });

  if ('profile' in postTwoFactorAuthenticationResponse.data) {
    tokenAtom(ctx, postTwoFactorAuthenticationResponse.data.token);
    fetchProfile.dataAtom(ctx, postTwoFactorAuthenticationResponse.data.profile);
    sessionAtom(ctx, { isAuthenticated: true });

    router.navigate({
      to: '/',
      replace: true
    });
  }
}, 'confirmationSubmit').pipe(
  withAssign((original, name) => ({
    loadingAtom: atom((ctx) => ctx.spy(original.pendingAtom) > 0, `${name}.loading`)
  }))
);

export const signUpSubmit = reatomAsync(async (ctx, payload) => {
  try {
    const {
      values: { passwordConfirmation, ...values }
    } = payload;

    await postSignUp({ params: values });

    toast.success('Your account has been created 👍', {
      cancel: { label: 'Close' },
      description: 'We are very glad to see you, have fun'
    });

    stageAtom(ctx, { value: 'signIn' });
  } catch (error) {
    console.error(error);
  }
}, 'signUpSubmit').pipe(
  withAssign((original, name) => ({
    loadingAtom: atom((ctx) => ctx.spy(original.pendingAtom) > 0, `${name}.loading`)
  }))
);
