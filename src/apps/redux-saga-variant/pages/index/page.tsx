import {
  Avatar,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flag
} from '@/components/ui';

import { useIndexPage } from './hooks/useIndexPage';

export const IndexPage = () => {
  const { state, functions } = useIndexPage();

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-6'>
        <div className='flex items-center space-x-4'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src={state.profile.avatar} alt='profile' />
          </Avatar>
          <div className='grid gap-1.5'>
            <CardTitle className='text-sm'>{state.profile.login}</CardTitle>
            <CardDescription className='text-sm'>{state.profile.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='grid gap-2 p-6'>
        <div className='flex items-center space-x-2 text-sm'>
          <div className='w-16'>id</div>
          <div className='flex-1 font-medium'>{state.profile.id}</div>
        </div>
        <div className='flex items-center space-x-2 text-sm'>
          <div className='w-16'>first name</div>
          <div className='flex-1 font-medium'>{state.profile.firstName}</div>
        </div>
        <div className='flex items-center space-x-2 text-sm'>
          <div className='w-16'>last name</div>
          <div className='flex-1 font-medium'>{state.profile.lastName}</div>
        </div>
        <div className='flex items-center space-x-2 text-sm'>
          <div className='w-16'>role</div>
          <div className='flex-1 font-medium'>{state.profile.role}</div>
        </div>
        <div className='flex items-center space-x-2 text-sm'>
          <div className='w-16'>country</div>
          <div className='flex items-center space-x-2'>
            <Flag className='size-3' code={state.profile.country.code} />
            <div className='flex-1 font-medium'>{state.profile.country.label}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button onClick={functions.onLogoutClick}>Logout</Button>
      </CardFooter>
    </Card>
  );
};
