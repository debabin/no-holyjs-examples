import { atom, reatomAsync, withAssign } from '@reatom/framework';
import { reatomTimer } from '@reatom/timer';
import { fetchProfile, session, token } from '@reatom-variant/model';
import { router } from '@reatom-variant/router';
import { toast } from 'sonner';

import {
  postOtpEmail,
  postOtpPhone,
  postSignInLogin,
  postSignUp,
  postTwoFactorAuthentication
} from '@/utils/api/requests';

export type Stage = 'signIn' | 'signUp' | 'selectConfirmation' | 'confirmation';

export const stage = atom<{ value: Stage }>({ value: 'signIn' }, 'stage');

export const otp = atom<{ type: 'email' | 'phone'; resource: string; retryDelay: number }>(
  {
    type: 'email',
    resource: '',
    retryDelay: 0
  },
  'otp'
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

          stage(ctx, { value: 'confirmation' });
        }
      } catch (error) {
        console.error(error);
      }
    }, `${name}.otpResend`)
  }))
);

export const signInSubmit = reatomAsync(async (ctx, payload) => {
  try {
    const { resource, values } = payload;

    if (resource === 'email') {
      const postOtpEmailResponse = await postOtpEmail({
        params: { email: values.login }
      });

      if (!postOtpEmailResponse.data.retryDelay) return;

      otp(ctx, {
        type: 'email',
        resource: values.login,
        retryDelay: postOtpEmailResponse.data.retryDelay
      });

      otp.countdown.startTimer(ctx, postOtpEmailResponse.data.retryDelay / 1000);
      stage(ctx, { value: 'confirmation' });
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
      stage(ctx, { value: 'selectConfirmation' });
      return;
    }

    if ('profile' in postSignInLoginResponse.data) {
      token(ctx, postSignInLoginResponse.data.token);
      fetchProfile.dataAtom(ctx, postSignInLoginResponse.data.profile);
      session(ctx, { isAuthenticated: true });

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
}, 'signInSubmit').pipe(
  withAssign((original, name) => ({
    loading: atom((ctx) => ctx.spy(original.pendingAtom) > 0, `${name}.loading`)
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
      otp(ctx, {
        type: selectedResource,
        resource: values.resource,
        retryDelay: postOtpApiResponse.data.retryDelay
      });
      otp.countdown.startTimer(ctx, postOtpApiResponse.data.retryDelay / 1000);
      stage(ctx, { value: 'confirmation' });
    }
  } catch (error) {
    console.error(error);
  }
}, 'selectConfirmationSubmit').pipe(
  withAssign((original, name) => ({
    loading: atom((ctx) => ctx.spy(original.pendingAtom) > 0, `${name}.loading`)
  }))
);

export const confirmationSubmit = reatomAsync(async (ctx, payload) => {
  try {
    const { values } = payload;
    const postTwoFactorAuthenticationResponse = await postTwoFactorAuthentication({
      params: {
        otp: values.otp,
        source: ctx.get(otp).resource
      }
    });

    if ('profile' in postTwoFactorAuthenticationResponse.data) {
      token(ctx, postTwoFactorAuthenticationResponse.data.token);
      fetchProfile.dataAtom(ctx, postTwoFactorAuthenticationResponse.data.profile);
      session(ctx, { isAuthenticated: true });

      router.navigate({
        to: '/',
        replace: true
      });
    }
  } catch (error) {
    console.error(error);
  }
}, 'confirmationSubmit').pipe(
  withAssign((original, name) => ({
    loading: atom((ctx) => ctx.spy(original.pendingAtom) > 0, `${name}.loading`)
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

    stage(ctx, { value: 'signIn' });
  } catch (error) {
    console.error(error);
  }
}, 'signUpSubmit').pipe(
  withAssign((original, name) => ({
    loading: atom((ctx) => ctx.spy(original.pendingAtom) > 0, `${name}.loading`)
  }))
);
