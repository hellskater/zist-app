import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { CustomSession } from '../auth';
import axiosInstance from '../axios';
import { User } from '../types/gist';

const getGithubProfile = async (
  username: string | undefined,
  accessToken: string
) => {
  let userData: User;

  if (accessToken) {
    const response = await axiosInstance.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    userData = response.data;
  } else {
    try {
      const response = await axiosInstance.get(
        `https://api.github.com/users/${username}`
      );

      userData = response.data;
    } catch (error) {
      const response = await axiosInstance.get(
        `https://api.github.com/users/${username}`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      userData = response.data;
    }
  }

  return userData as User;
};

export const useGithubProfile = (username: string | undefined) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['githubProfile', username],
    queryFn: () =>
      getGithubProfile(username, (session as CustomSession)?.accessToken),
    enabled: !!username,
  });
};
