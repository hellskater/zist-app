import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { CustomSession } from '../auth';
import axiosInstance from '../axios';

const getDbUser = async () => {
  const response = await axiosInstance.get(
    `${window.location.origin}/api/autotagcount`
  );

  return response.data as {
    autotagcount: number;
    username: string;
    maxallowed: number;
    updatedAt: string;
  };
};

export const useGetDbUser = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['dbUser', (session as CustomSession)?.user?.username],
    queryFn: getDbUser,
    enabled: !!session,
  });
};
