import { useQueryClient } from '@tanstack/react-query';

import { Files } from '../types/gist';

import { getGistFile } from './useGists';

const useGetAllFilesOfGist = () => {
  const queryClient = useQueryClient();

  const getFilesData = async (files: Files) => {
    const data = await Promise.all(
      Object.keys(files).map(async (filename) => {
        let fileData;
        if (queryClient.getQueryData(['gistFile', files[filename].raw_url])) {
          fileData = queryClient.getQueryData([
            'gistFile',
            files[filename].raw_url,
          ]);
          return {
            filename,
            fileContent: fileData,
          };
        }
        fileData = await queryClient.fetchQuery(
          ['gistFile', files[filename].raw_url],
          () => getGistFile(files[filename].raw_url)
        );
        return {
          filename,
          fileContent: fileData,
        };
      })
    );
    return data;
  };

  return {
    getFilesData,
  };
};

export default useGetAllFilesOfGist;
