import { signUpSubmit } from '@reatom-variant/pages/auth/model';
import { reatomComponent } from '@reatom/npm-react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { SpinnerIcon } from '@/components/icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Flag,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  PasswordInput,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IDS } from '@/utils';

import { AuthButtonsContainer } from '../AuthButtonsContainer/AuthButtonsContainer';
import { useSignUpForm } from './hooks/useSingUpForm';

export const SignUpForm = reatomComponent(({ ctx }) => {
  const loading = ctx.spy(signUpSubmit.loadingAtom);
  const { form, state, functions } = useSignUpForm();

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
            className='space-y-6'
            onSubmit={async (event) => {
              event.preventDefault();
              await functions.onSubmit();
            }}
          >
            <FormField
              render={({ field }) => (
                <FormItem id={IDS.INPUT.EMAIL}>
                  <Label className='sr-only' htmlFor='email'>
                    Email
                  </Label>
                  <FormControl>
                    <Input
                      disabled={loading}
                      autoCapitalize='none'
                      autoComplete='email'
                      autoCorrect='off'
                      placeholder='email@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='email'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem id={IDS.INPUT.LOGIN}>
                  <Label className='sr-only' htmlFor='login'>
                    Login
                  </Label>
                  <FormControl>
                    <Input
                      disabled={loading}
                      autoCapitalize='none'
                      autoCorrect='off'
                      placeholder='your login'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='login'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem id={IDS.INPUT.FIRST_NAME}>
                  <Label className='sr-only' htmlFor='firstName'>
                    First name
                  </Label>
                  <FormControl>
                    <Input
                      disabled={loading}
                      autoCapitalize='none'
                      autoComplete='firstName'
                      autoCorrect='off'
                      placeholder='your first perfect name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='firstName'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem id={IDS.INPUT.LAST_NAME}>
                  <Label className='sr-only' htmlFor='lastName'>
                    Last name
                  </Label>
                  <FormControl>
                    <Input
                      disabled={loading}
                      autoCapitalize='none'
                      autoComplete='lastName'
                      autoCorrect='off'
                      placeholder='your second amazing name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='lastName'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          className={cn(
                            'w-[200px] w-full justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                          id={IDS.SELECT.COUNTRY}
                          variant='outline'
                          role='combobox'
                        >
                          <div className='flex items-center gap-2'>
                            <Flag
                              className='size-4'
                              code={field.value.code as 'by' | 'kz' | 'ru' | 'uz'}
                            />
                            {
                              state.countries.find((country) => country.id === field.value.id)!
                                .label
                            }
                          </div>
                          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-[280px] p-0'>
                      <Command>
                        <CommandInput placeholder='Search language...' />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {state.countries.map((country) => (
                            <CommandItem
                              key={country.id}
                              className='flex items-center  gap-2'
                              value={country.label}
                              onSelect={() => {
                                form.setValue('country', country);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  country.id === field.value?.id ? 'opacity-100' : 'opacity-0'
                                )}
                              />
                              <Flag className='size-4' code={country.code} />
                              <span id={`${IDS.SELECT.COUNTRY}-${country.code}`}>
                                {country.label}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
              name='country'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem id={IDS.INPUT.PASSWORD}>
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
            <FormField
              render={({ field }) => (
                <FormItem id={IDS.INPUT.PASSWORD_CONFIRMATION}>
                  <Label className='sr-only' htmlFor='passwordConfirmation'>
                    Confirm password
                  </Label>
                  <FormControl>
                    <PasswordInput
                      disabled={loading}
                      autoCapitalize='none'
                      autoComplete='passwordConfirmation'
                      autoCorrect='off'
                      placeholder='confirm your password dude'
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
              name='passwordConfirmation'
              control={form.control}
            />
            <Button className='w-full' disabled={loading} id={IDS.BUTTON.SIGN_UP}>
              {loading && <SpinnerIcon className='mr-2 h-4 w-4 animate-spin' />}
              Sign up
            </Button>
          </form>
        </Form>

        <div className='flex justify-center '>
          <Button disabled={loading} variant='link' onClick={functions.goToSignIn}>
            <span className='bg-background px-2 text-muted-foreground'>have account already</span>
          </Button>
        </div>

        <AuthButtonsContainer loading={loading} />
      </div>
    </div>
  );
}, 'SignUpForm');
