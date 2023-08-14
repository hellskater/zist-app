import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import { CustomProfile, CustomSession } from '../auth';

// ---------------------------------- GET all gists ----------------------------------

const getAllGists = async (accessToken: string) => {
  const response = await axios.get('https://api.github.com/gists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return response.data;
};

export const useGetAllGists = () => {
  const { data: session } = useSession();

  return useQuery(['gists', (session?.user as CustomProfile)?.id], () =>
    getAllGists((session as CustomSession)?.accessToken)
  );
};

// ---------------------------------- GET gist ----------------------------------

const getGist = async (url: string) => {
  const response = await axios.get(url);

  return response.data;
};

export const useGetGist = (url: string) => {
  return useQuery(['gist', url], () => getGist(url), {
    enabled: !!url,
  });
};
