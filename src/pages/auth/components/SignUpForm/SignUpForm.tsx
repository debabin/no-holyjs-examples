import { SpinnerIcon } from '@/components/icons';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  PasswordInput
} from '@/components/ui';

import { AuthButtonsContainer } from '../AuthButtonsContainer/AuthButtonsContainer';

import { useSignUpForm } from './hooks/useSingUpForm';

export const SignUpForm = () => {
  const { form, functions, state } = useSignUpForm();

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
        <p className='text-sm text-muted-foreground'>
          Enter your email below to create your account
        </p>
      </div>
      <div className='grid gap-2'>
        <Form {...form}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await functions.onSubmit();
            }}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <Label className='sr-only' htmlFor='email'>
                    Email
                  </Label>
                  <FormControl>
                    <Input
                      id='email'
                      placeholder='email@example.com'
                      autoCapitalize='none'
                      autoComplete='email'
                      autoCorrect='off'
                      disabled={state.loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <Label className='sr-only' htmlFor='firstName'>
                    First name
                  </Label>
                  <FormControl>
                    <Input
                      id='firstName'
                      placeholder='your first perfect name'
                      autoCapitalize='none'
                      autoComplete='firstName'
                      autoCorrect='off'
                      disabled={state.loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <Label className='sr-only' htmlFor='lastName'>
                    Last name
                  </Label>
                  <FormControl>
                    <Input
                      id='lastName'
                      placeholder='your second amazing name'
                      autoCapitalize='none'
                      autoComplete='lastName'
                      autoCorrect='off'
                      disabled={state.loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name='passwordConfirmation'
              render={({ field }) => (
                <FormItem>
                  <Label className='sr-only' htmlFor='passwordConfirmation'>
                    Confirm password
                  </Label>
                  <FormControl>
                    <PasswordInput
                      id='passwordConfirmation'
                      placeholder='confirm your password dude'
                      autoCapitalize='none'
                      autoComplete='passwordConfirmation'
                      autoCorrect='off'
                      disabled={state.loading}
                      {...field}
                    />
                  </FormControl>
                  {state.isPasswordsEqual && !!field.value && (
                    <FormDescription>passwords are equal 🔥</FormDescription>
                  )}
                  {!state.isPasswordsEqual && (
                    <FormDescription>confirm your password</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' disabled={state.loading}>
              {state.loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
              Sign up
            </Button>
          </form>
        </Form>
        <div className='flex justify-center '>
          <Button disabled={state.loading} variant='link' onClick={functions.goToSignIn}>
            <span className='bg-background px-2 text-muted-foreground'>have account already</span>
          </Button>
        </div>

        <AuthButtonsContainer loading={state.loading} />
      </div>
    </div>
  );
};
