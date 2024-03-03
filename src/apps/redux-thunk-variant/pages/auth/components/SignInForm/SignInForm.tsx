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

export const SignInForm = () => {
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
            onSubmit={(event) => {
              event.preventDefault();
              functions.onSubmit();
            }}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='login'
              render={({ field }) => (
                <FormItem>
                  <Label className='sr-only' htmlFor='login'>
                    {state.isEmail ? 'email' : 'login'}
                  </Label>
                  <FormControl>
                    <Input
                      id='login'
                      placeholder='write login or email'
                      autoCapitalize='none'
                      autoCorrect='off'
                      disabled={state.loading}
                      {...field}
                      // onChange={signInForm.onChange('login')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!state.isEmail && (
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <Label className='sr-only' htmlFor='password'>
                      Password
                    </Label>
                    <FormControl>
                      <PasswordInput
                        id='password'
                        placeholder='your very secret password'
                        autoCapitalize='none'
                        autoComplete='password'
                        autoCorrect='off'
                        disabled={state.loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type='submit' className='w-full' disabled={state.loading}>
              {state.loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
              Sign in
            </Button>
          </form>
        </Form>
        <div className='flex justify-center'>
          <Button disabled={state.loading} variant='link' onClick={functions.goToSignUp}>
            <span className='bg-background px-2 text-muted-foreground'>create new account</span>
          </Button>
        </div>
        <AuthButtonsContainer loading={state.loading} />

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
};
