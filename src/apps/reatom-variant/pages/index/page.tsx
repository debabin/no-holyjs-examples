import { reatomComponent } from '@reatom/npm-react';
import { fetchProfile } from '@reatom-variant/model';

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

import { logout } from './model';

export const IndexPage = reatomComponent(({ ctx }) => {
  const profile = ctx.spy(fetchProfile.dataAtom);
  const onLogoutClick = () => logout(ctx);

  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-6'>
        <div className='flex items-center space-x-4'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src={profile.avatar} alt='profile' />
          </Avatar>
          <div className='grid gap-1.5'>
            <CardTitle className='text-sm'>{profile.login}</CardTitle>
            <CardDescription className='text-sm'>{profile.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className='grid gap-2 p-6'>
        <div className='flex items-center space-x-2 text-sm'>
          <div className='w-16'>id</div>
          <div className='flex-1 font-medium'>{profile.id}</div>
        </div>
        <div className='flex items-center space-x-2 text-sm'>
          <div className='w-16'>first name</div>
          <div className='flex-1 font-medium'>{profile.firstName}</div>
        </div>
        <div className='flex items-center space-x-2 text-sm'>
          <div className='w-16'>last name</div>
          <div className='flex-1 font-medium'>{profile.lastName}</div>
        </div>
        <div className='flex items-center space-x-2 text-sm'>
          <div className='w-16'>role</div>
          <div className='flex-1 font-medium'>{profile.role}</div>
        </div>
        <div className='flex items-center space-x-2 text-sm'>
          <div className='w-16'>country</div>
          <div className='flex items-center space-x-2'>
            <Flag className='size-3' code={profile.country.code} />
            <div className='flex-1 font-medium'>{profile.country.label}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-end'>
        <Button onClick={onLogoutClick}>Logout</Button>
      </CardFooter>
    </Card>
  );
}, 'IndexPage');
