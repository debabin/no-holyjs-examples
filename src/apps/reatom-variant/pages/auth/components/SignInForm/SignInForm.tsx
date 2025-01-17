import { signInSubmit } from '@reatom-variant/pages/auth/model';
import { reatomComponent } from '@reatom/npm-react';

import { SpinnerIcon } from '@/components/icons';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  PasswordInput
} from '@/components/ui';

import { AuthButtonsContainer } from '../AuthButtonsContainer/AuthButtonsContainer';
import { useSignInForm } from './hooks/useSignInForm';

export const SignInForm = reatomComponent(({ ctx }) => {
  const loading = ctx.spy(signInSubmit.loadingAtom);
  const { form, functions, state } = useSignInForm();

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Login to your account</h1>
        <p className='text-sm text-muted-foreground'>Enter your email and password</p>
      </div>
      <div>
        <Form {...form}>
          <form
            className='space-y-4'
            onSubmit={(event) => {
              event.preventDefault();
              functions.onSubmit();
            }}
          >
            <FormField
              render={({ field }) => (
                <FormItem>
                  <Label className='sr-only' htmlFor='login'>
                    {state.isEmail ? 'email' : 'login'}
                  </Label>
                  <FormControl>
                    <Input
                      disabled={loading}
                      autoCapitalize='none'
                      autoCorrect='off'
                      placeholder='write login or email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='login'
              control={form.control}
            />
            {!state.isEmail && (
              <FormField
                render={({ field }) => (
                  <FormItem>
                    <Label className='sr-only' htmlFor='password'>
                      Password
                    </Label>
                    <FormControl>
                      <PasswordInput
                        disabled={loading}
                        autoCapitalize='none'
                        autoComplete='password'
                        autoCorrect='off'
                        placeholder='your very secret password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name='password'
                control={form.control}
              />
            )}

            <Button className='w-full' disabled={loading} type='submit'>
              {loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
              Sign in
            </Button>
          </form>
        </Form>
        <div className='flex justify-center'>
          <Button disabled={loading} variant='link' onClick={functions.goToSignUp}>
            <span className='bg-background px-2 text-muted-foreground'>create new account</span>
          </Button>
        </div>
        <AuthButtonsContainer loading={loading} />

        <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
          By clicking continue, you agree to our{' '}
          <a href='/terms' className='underline underline-offset-4 hover:text-primary'>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href='/privacy' className='underline underline-offset-4 hover:text-primary'>
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}, 'SignInForm');
