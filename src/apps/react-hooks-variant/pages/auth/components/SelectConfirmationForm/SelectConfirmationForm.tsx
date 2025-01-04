import { PatternFormat } from 'react-number-format';

import { SpinnerIcon } from '@/components/icons';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem
} from '@/components/ui';
import { IDS } from '@/utils';

import { useSelectConfirmationForm } from './hooks/useSelectConfirmationForm';

export const SelectConfirmationForm = () => {
  const { state, functions, form } = useSelectConfirmationForm();

  return (
    <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
      {state.selectConfirmationFormStage === 'select' && (
        <>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Choose resource for otp code</h1>
            <p className='text-sm text-muted-foreground'>We sent you a code to your resource</p>
          </div>

          <RadioGroup
            className='flex flex-col space-y-2'
            defaultValue={state.selectedResource}
            onValueChange={(value: 'email' | 'phone') => functions.setSelectedResource(value)}
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem id={IDS.RADIO_BUTTON.EMAIL} value='email' />
              <Label htmlFor='email'>email</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem id={IDS.RADIO_BUTTON.PHONE} value='phone' />
              <Label htmlFor='phone'>phone</Label>
            </div>
          </RadioGroup>

          <div className='items-top flex space-x-2'>
            <Checkbox
              checked={state.termsChecked}
              id={IDS.CHECKBOX.TERMS}
              onCheckedChange={(checked) => functions.setTermsChecked(checked)}
            />
            <div className='grid gap-1.5 leading-none'>
              <label
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                htmlFor='terms'
              >
                Accept terms and conditions
              </label>
              <p className='text-sm text-muted-foreground'>
                You agree to our{' '}
                <a href='/terms' className='underline underline-offset-4 hover:text-primary'>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href='/privacy' className='underline underline-offset-4 hover:text-primary'>
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          <Button
            className='w-full'
            disabled={!state.termsChecked}
            id={IDS.BUTTON.CONTINUE}
            onClick={functions.onSelectContinue}
          >
            Continue
          </Button>
        </>
      )}
      {state.selectConfirmationFormStage === 'form' && (
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Two factor authentication</h1>
            <p className='text-sm text-muted-foreground'>We sent you a code to your email</p>
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
                {state.selectedResource === 'phone' && (
                  <FormField
                    render={({ field }) => (
                      <FormItem id={IDS.INPUT.PHONE}>
                        <Label className='sr-only' htmlFor='phone'>
                          Phone
                        </Label>
                        <FormControl>
                          <PatternFormat
                            allowEmptyFormatting
                            customInput={Input}
                            format='+7 ### ### ####'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    name='resource'
                    control={form.control}
                  />
                )}
                {state.selectedResource === 'email' && (
                  <FormField
                    render={({ field }) => (
                      <FormItem id={IDS.INPUT.EMAIL}>
                        <Label className='sr-only' htmlFor='otp'>
                          {state.selectedResource === 'email' ? 'Email' : 'Phone'}
                        </Label>
                        <FormControl>
                          <Input placeholder='write email' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    name='resource'
                    control={form.control}
                  />
                )}
                <Button
                  className='w-full'
                  disabled={state.loading}
                  id={IDS.BUTTON.CONFIRM}
                  type='submit'
                >
                  {state.loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
                  Confirm
                </Button>
                <Button
                  className='w-full'
                  disabled={state.loading}
                  id={IDS.BUTTON.BACK}
                  type='button'
                  variant='outline'
                  onClick={functions.onFormBack}
                >
                  {state.loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
                  Back
                </Button>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};
