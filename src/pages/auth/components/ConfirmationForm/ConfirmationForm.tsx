import { SpinnerIcon } from '@/components/icons';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Label,
  PasswordInput
} from '@/components/ui';

import { hideResource } from './helpers/hideResource';
import { useConfirmationForm } from './hooks/useConfirmation';

export const ConfirmationForm = () => {
  const { form, state, functions } = useConfirmationForm();

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Two factor authentication</h1>
        <p className='text-sm text-muted-foreground'>
          We sent you a code to your {state.otp.type}{' '}
          {hideResource(state.otp.resource, state.otp.type)}
        </p>
      </div>
      <div className='grid gap-2'>
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
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <Label className='sr-only' htmlFor='otp'>
                    Password
                  </Label>
                  <FormControl>
                    <PasswordInput
                      id='otp'
                      maxLength={6}
                      placeholder='your otp code'
                      autoCapitalize='none'
                      autoComplete='otp'
                      autoCorrect='off'
                      disabled={state.loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex flex-col gap-2'>
              <Button type='submit' className='w-full' disabled={state.loading}>
                {state.loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
                Confirm
              </Button>
              {!!state.seconds && (
                <div>
                  <p className='text-center text-sm text-muted-foreground'>
                    try again after {state.seconds} seconds
                  </p>
                </div>
              )}
              {!state.seconds && (
                <Button
                  type='button'
                  variant='outline'
                  className='w-full'
                  disabled={state.loading}
                  onClick={functions.onOtpResend}
                >
                  {state.loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
                  Send otp
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
