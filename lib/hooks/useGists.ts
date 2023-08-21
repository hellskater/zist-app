import {
  Updater,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import { CustomProfile, CustomSession } from '../auth';
import { Gist, GistFileType } from '../types/gist';
import axios from '../axios';

// ---------------------------------- GET all authenticated gists ----------------------------------

const getAllGistsOfAuthenticatedUser = async (accessToken: string) => {
  const response = await axios.get('https://api.github.com/gists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return response.data as Gist[];
};

export const useGetAllGistsOfAuthenticatedUser = () => {
  const { data: session } = useSession();

  return useQuery(
    ['gists', (session?.user as CustomProfile)?.id],
    () =>
      getAllGistsOfAuthenticatedUser((session as CustomSession)?.accessToken),
    {
      enabled: !!session,
    }
  );
};

// ---------------------------------- GET all gists of a user ----------------------------------

const getAllGistsOfUser = async (username: string, accessToken: string) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/gists`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  return response.data as Gist[];
};

export const useGetAllGistsOfUser = (username: string) => {
  const { data: session } = useSession();
  return useQuery(
    ['gists', username],
    () => getAllGistsOfUser(username, (session as CustomSession)?.accessToken),
    {
      enabled: !!username && !!session,
    }
  );
};

// ---------------------------------- GET gist by id ----------------------------------

const getGistById = async (id: string, accessToken: string) => {
  const response = await axios.get(`https://api.github.com/gists/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return response.data as Gist;
};

export const useGetGistById = (id: string) => {
  const { data: session } = useSession();
  return useQuery(
    ['gist', id],
    () => getGistById(id, (session as CustomSession).accessToken),
    {
      enabled: !!id && !!session,
    }
  );
};

// ---------------------------------- GET gist file ----------------------------------

export const getGistFile = async (raw_url: string | undefined) => {
  if (!raw_url) {
    return;
  }
  const response = await axios.get(raw_url);

  return response.data;
};

export const useGetGistFile = (raw_url: string | undefined) => {
  return useQuery(['gistFile', raw_url], () => getGistFile(raw_url), {
    enabled: !!raw_url,
  });
};

// ---------------------------------- PATCH gist ----------------------------------

type GistUpdatePayload = {
  id: string;
  description?: string;
  files?: GistFileType[];
  public?: boolean;
};

const patchGist = async (accessToken: string, data: GistUpdatePayload) => {
  const response = await axios.patch(
    `https://api.github.com/gists/${data.id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  return response.data;
};

export const usePatchGist = () => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  return useMutation(
    (data: GistUpdatePayload) =>
      patchGist((session as CustomSession)?.accessToken, data),
    {
      onMutate: async (data) => {
        await queryClient.cancelQueries([
          'gists',
          (session?.user as CustomProfile)?.id,
        ]);

        await queryClient.cancelQueries(['gist', data.id]);

        const previousGists = queryClient.getQueryData([
          'gists',
          (session?.user as CustomProfile)?.id,
        ]) as Gist[];

        const previousGist = queryClient.getQueryData([
          'gist',
          data.id,
        ]) as Gist;

        if (!previousGists) {
          return;
        }

        const filteredGists = previousGists.filter(
          (gist) => gist.id !== data.id
        );

        queryClient.setQueryData(
          ['gists', (session?.user as CustomProfile)?.id],
          ((old: Gist[]) => {
            return [
              ...filteredGists,
              {
                ...old.find((gist) => gist.id === data.id),
                ...data,
              },
            ] as Gist[];
          }) as Updater<Gist[] | undefined, Gist[] | undefined>
        );

        queryClient.setQueryData(['gist', data.id], ((old: Gist) => {
          return {
            ...old,
            ...data,
          } as Gist;
        }) as Updater<Gist | undefined, Gist | undefined>);

        return { previousGists, previousGist };
      },

      onError: (err, _, context) => {
        queryClient.setQueryData(
          ['gists', (session?.user as CustomProfile)?.id],
          context?.previousGists
        );

        queryClient.setQueryData(
          ['gist', context?.previousGist?.id],
          context?.previousGist
        );
      },

      onSuccess: (data) => {
        queryClient.setQueryData(
          ['gists', (session?.user as CustomProfile)?.id],
          ((old: Gist[]) => {
            return [
              ...old.filter((gist) => gist.id !== data.id),
              data,
            ] as Gist[];
          }) as Updater<Gist[] | undefined, Gist[] | undefined>
        );

        queryClient.setQueryData(['gist', data.id], ((old: Gist) => {
          return {
            ...old,
            ...data,
          } as Gist;
        }) as Updater<Gist | undefined, Gist | undefined>);
      },
    }
  );
};

// ---------------------------------- POST gist ----------------------------------

type GistCreatePayload = {
  description?: string;
  files: GistFileType[];
  public?: boolean;
};

const postGist = async (accessToken: string, data: GistCreatePayload) => {
  const response = await axios.post(`https://api.github.com/gists`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return response.data as Gist;
};

export const usePostGist = () => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  return useMutation(
    (data: GistCreatePayload) =>
      postGist((session as CustomSession)?.accessToken, data),
    {
      onError: () => {
        toast.error('Failed to create gist');
      },

      onSuccess: (data) => {
        queryClient.setQueryData(
          ['gists', (session?.user as CustomProfile)?.id],
          ((old: Gist[]) => {
            return [...old, data] as Gist[];
          }) as Updater<Gist[] | undefined, Gist[] | undefined>
        );
      },
    }
  );
};

// ---------------------------------- DELETE gist ----------------------------------

const deleteGist = async (accessToken: string, id: string) => {
  const response = await axios.delete(`https://api.github.com/gists/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  return response.data;
};

export const useDeleteGist = () => {
  const { data: session } = useSession();

  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => deleteGist((session as CustomSession)?.accessToken, id),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries([
          'gists',
          (session?.user as CustomProfile)?.id,
        ]);

        const previousGists = queryClient.getQueryData([
          'gists',
          (session?.user as CustomProfile)?.id,
        ]) as Gist[];

        if (!previousGists) {
          return;
        }

        const filteredGists = previousGists.filter((gist) => gist.id !== id);

        queryClient.setQueryData(
          ['gists', (session?.user as CustomProfile)?.id],
          filteredGists
        );

        return { previousGists };
      },

      onError: (err, _, context) => {
        queryClient.setQueryData(
          ['gists', (session?.user as CustomProfile)?.id],
          context?.previousGists
        );
      },
    }
  );
};
