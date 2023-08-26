import {
  Updater,
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import { CustomProfile, CustomSession } from '../auth';
import {
  Gist,
  GistFileType,
  CreateFiles,
  SingleGistResponseData,
} from '../types/gist';
import axios from '../axios';

// ---------------------------------- GET all authenticated gists ----------------------------------

export const getAllGistsOfAuthenticatedUser = async (
  accessToken: string,
  page: number
) => {
  const response = await axios.get('https://api.github.com/gists', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
    params: {
      page,
    },
  });

  return response.data as Gist[];
};

export const useGetAllGistsOfAuthenticatedUser = () => {
  const { data: session } = useSession();

  return useInfiniteQuery({
    queryKey: ['gists', (session?.user as CustomProfile)?.id],
    queryFn: ({ pageParam }) =>
      getAllGistsOfAuthenticatedUser(
        (session as CustomSession)?.accessToken,
        pageParam
      ),
    enabled: !!session,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    placeholderData: keepPreviousData,
  });
};

// ---------------------------------- GET all gists of a user ----------------------------------

const getAllGistsOfUser = async (
  username: string,
  accessToken: string,
  page: number
) => {
  let data: Gist[] = [];

  if (accessToken) {
    const response = await axios.get(
      `https://api.github.com/users/${username}/gists`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
        params: {
          page,
        },
      }
    );

    data = response.data as Gist[];
  } else {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/gists`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
          params: {
            page,
          },
        }
      );

      data = response.data as Gist[];
    } catch {
      const response = await axios.get(
        `https://api.github.com/users/${username}/gists`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
          params: {
            page,
          },
        }
      );

      data = response.data as Gist[];
    }
  }

  return data;
};

export const useGetAllGistsOfUser = (username: string) => {
  const { data: session } = useSession();
  return useInfiniteQuery({
    queryKey: ['gists', username],
    queryFn: ({ pageParam }) =>
      getAllGistsOfUser(
        username,
        (session as CustomSession)?.accessToken,
        pageParam
      ),
    enabled: !!username,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    placeholderData: keepPreviousData,
  });
};

// ---------------------------------- GET gist by id ----------------------------------

const getGistById = async (id: string, accessToken: string) => {
  let data: SingleGistResponseData;

  if (accessToken) {
    const response = await axios.get(`https://api.github.com/gists/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    data = response.data as SingleGistResponseData;
  } else {
    try {
      const response = await axios.get(`https://api.github.com/gists/${id}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      });

      data = response.data as SingleGistResponseData;
    } catch {
      const response = await axios.get(`https://api.github.com/gists/${id}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      data = response.data as SingleGistResponseData;
    }
  }

  return data;
};

export const useGetGistById = (id: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ['gist', id],
    queryFn: () => getGistById(id, (session as CustomSession).accessToken),
    enabled: true,
  });
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
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['gistFile', raw_url],
    queryFn: () => getGistFile(raw_url),
    enabled: !!raw_url && !!session,
  });
};

// ---------------------------------- PATCH gist ----------------------------------

export type GistUpdatePayload = {
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

  const history = useRouter();

  return useMutation({
    mutationFn: (data: GistUpdatePayload) =>
      patchGist((session as CustomSession)?.accessToken, data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: ['gists', (session?.user as CustomProfile)?.id],
      });

      await queryClient.cancelQueries({
        queryKey: ['gist', data.id],
      });

      const previousGists = queryClient.getQueryData([
        'gists',
        (session?.user as CustomProfile)?.id,
      ]) as Gist[];

      const previousGist = queryClient.getQueryData(['gist', data.id]) as Gist;

      if (!previousGists) {
        return;
      }

      const filteredGists = previousGists.filter((gist) => gist.id !== data.id);

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
          return [...old.filter((gist) => gist.id !== data.id), data] as Gist[];
        }) as Updater<Gist[] | undefined, Gist[] | undefined>
      );

      queryClient.setQueryData(['gist', data.id], ((old: Gist) => {
        return {
          ...old,
          ...data,
        } as Gist;
      }) as Updater<Gist | undefined, Gist | undefined>);
      history.push('/dashboard/my-zists');
    },
  });
};

// ---------------------------------- POST gist ----------------------------------

export type GistCreatePayload = {
  description?: string;
  files: CreateFiles;
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
  const history = useRouter();

  return useMutation({
    mutationFn: (data: GistCreatePayload) =>
      postGist((session as CustomSession)?.accessToken, data),
    onError: () => {
      toast.error('Failed to create gist');
    },

    onSuccess: (data) => {
      queryClient.setQueryData(
        ['gists', (session?.user as CustomProfile)?.id],
        ((old: Gist[] | undefined) => {
          const newData = data as Gist;
          if (old) {
            return [...old, newData] as Gist[];
          } else {
            return [newData];
          }
        }) as Updater<Gist[] | undefined, Gist[] | undefined>
      );
      history.push('/dashboard/my-zists');
    },
  });
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

  return useMutation({
    mutationFn: (id: string) =>
      deleteGist((session as CustomSession)?.accessToken, id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ['gists', (session?.user as CustomProfile)?.id],
      });

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
  });
};
