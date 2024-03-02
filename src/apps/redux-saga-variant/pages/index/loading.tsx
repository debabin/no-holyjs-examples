import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const IndexLoading = () => (
  <Card className='w-full max-w-sm'>
    <CardHeader className='p-6'>
      <div className='flex items-center space-x-4'>
        <Skeleton className='size-10 rounded-full' />
        <div className='grid gap-1.5'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
        </div>
      </div>
    </CardHeader>
    <CardContent className='grid gap-2 p-6'>
      <div className='flex items-center space-x-2 text-sm'>
        <div className='w-16'>id</div>
        <Skeleton className='h-5 w-[200px]' />
      </div>
      <div className='flex items-center space-x-2 text-sm'>
        <div className='w-16'>first name</div>
        <Skeleton className='h-5 w-[200px]' />
      </div>
      <div className='flex items-center space-x-2 text-sm'>
        <div className='w-16'>last name</div>
        <Skeleton className='h-5 w-[200px]' />
      </div>
      <div className='flex items-center space-x-2 text-sm'>
        <div className='w-16'>role</div>
        <Skeleton className='h-5 w-[200px]' />
      </div>
      <div className='flex items-center space-x-2 text-sm'>
        <div className='w-16'>country</div>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-5 w-[200px]' />
        </div>
      </div>
    </CardContent>
    <CardFooter className='flex justify-end'>
      <Skeleton className='h-10 w-[100px]' />
    </CardFooter>
  </Card>
);
