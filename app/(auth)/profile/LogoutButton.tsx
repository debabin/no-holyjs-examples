'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';
import { useDeleteLogoutMutation } from '@/utils/api/hooks';

export const LogoutButton = () => {
  const router = useRouter();
  const deleteLogoutMutation = useDeleteLogoutMutation();

  const onLogoutClick = async () => {
    await deleteLogoutMutation.mutateAsync();
    router.replace('/auth');
  };

  return <Button onClick={onLogoutClick}>logout</Button>;
};
