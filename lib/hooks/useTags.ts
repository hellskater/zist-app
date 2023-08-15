import { usePatchGist } from './useGists';
import { getZistConfig, updateDescription } from './utils';

export const useUpdateTags = () => {
  const { mutateAsync: updateGist, ...rest } = usePatchGist();

  const updateTags = async ({
    tags,
    description,
    gistId,
  }: {
    tags: string[];
    description: string;
    gistId: string;
  }) => {
    let config = getZistConfig(description);

    config = {
      ...config,
      tags,
    };

    const updatedDescription = updateDescription(description, config);

    await updateGist({
      description: updatedDescription,
      id: gistId,
    });
  };

  return {
    updateTags,
    ...rest,
  };
};
