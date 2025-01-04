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
import { useConfirmationForm } from './hooks/ConfirmationForm';

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
            className='space-y-4'
            onSubmit={(event) => {
              event.preventDefault();
              functions.onSubmit();
            }}
          >
            <FormField
              render={({ field }) => (
                <FormItem>
                  <Label className='sr-only' htmlFor='otp'>
                    Password
                  </Label>
                  <FormControl>
                    <PasswordInput
                      disabled={state.loading}
                      id='otp'
                      maxLength={6}
                      autoCapitalize='none'
                      autoComplete='otp'
                      autoCorrect='off'
                      placeholder='your otp code'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='otp'
              control={form.control}
            />
            <div className='flex flex-col gap-2'>
              <Button className='w-full' disabled={state.loading} type='submit'>
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
                  className='w-full'
                  disabled={state.loading}
                  type='button'
                  variant='outline'
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
