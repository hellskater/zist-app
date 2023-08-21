import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { CustomSession } from '../auth';
import axiosInstance from '../axios';

const getGithubProfile = async (
  username: string | undefined,
  accessToken: string
) => {
  const response = await axiosInstance.get(
    `https://api.github.com/users/${username}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );
  return response.data;
};

export const useGithubProfile = (username: string | undefined) => {
  const { data: session } = useSession();

  return useQuery(
    ['githubProfile', username],
    () => getGithubProfile(username, (session as CustomSession)?.accessToken),
    {
      enabled: !!username && !!session,
    }
  );
};
