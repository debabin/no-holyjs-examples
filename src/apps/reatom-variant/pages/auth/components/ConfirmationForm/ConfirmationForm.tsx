import { confirmationSubmit, otpAtom } from '@reatom-variant/pages/auth/model';
import { reatomComponent } from '@reatom/npm-react';

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
import { useConfirmationForm } from './hooks/useConfirmationForm';

export const ConfirmationForm = reatomComponent(({ ctx }) => {
  const loading =
    ctx.spy(confirmationSubmit.loadingAtom) || ctx.spy(otpAtom.resend.pendingAtom) > 0;
  const seconds = Number((ctx.spy(otpAtom.countdown) / 1000).toFixed(0));
  const otpValue = ctx.spy(otpAtom);

  const { form } = useConfirmationForm();

  const handleFormSubmit = form.handleSubmit(async (values) => {
    try {
      await confirmationSubmit(ctx, { values });
    } catch (error: any) {
      form.setError('otp', { message: error.response.data.message });
    }
  });

  const onOtpResend = () => otpAtom.resend(ctx);

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight'>Two factor authentication</h1>
        <p className='text-sm text-muted-foreground'>
          We sent you a code to your {otpValue.type}{' '}
          {hideResource(otpValue.resource, otpValue.type)}
        </p>
      </div>
      <div className='grid gap-2'>
        <Form {...form}>
          <form className='space-y-4' onSubmit={handleFormSubmit}>
            <FormField
              render={({ field }) => (
                <FormItem>
                  <Label className='sr-only' htmlFor='otp'>
                    Password
                  </Label>
                  <FormControl>
                    <PasswordInput
                      disabled={loading}
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
              <Button className='w-full' disabled={loading} type='submit'>
                {loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
                Confirm
              </Button>
              {!!seconds && (
                <div>
                  <p className='text-center text-sm text-muted-foreground'>
                    try again after {seconds} seconds
                  </p>
                </div>
              )}
              {!seconds && (
                <Button
                  className='w-full'
                  disabled={loading}
                  type='button'
                  variant='outline'
                  onClick={onOtpResend}
                >
                  {loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
                  Send otp
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}, 'ConfirmationForm');
