import { usePatchGist } from './useGists';
import { getZistConfig, updateDescription } from './utils';

export const useCreateTag = () => {
  const { mutate: updateGist, ...rest } = usePatchGist();

  const createTag = ({
    tag,
    description,
    gistId,
  }: {
    tag: string;
    description: string;
    gistId: string;
  }) => {
    let config = getZistConfig(description);

    config = {
      ...config,
      tags: [...(config?.tags || []), tag],
    };

    const updatedDescription = updateDescription(description, config);

    updateGist({
      description: updatedDescription,
      id: gistId,
    });
  };

  return {
    createTag,
    ...rest,
  };
};

export const useDeleteTag = () => {
  const { mutate: updateGist, ...rest } = usePatchGist();

  const deleteTag = ({
    tag,
    description,
    gistId,
  }: {
    tag: string;
    description: string;
    gistId: string;
  }) => {
    let config = getZistConfig(description);

    config = {
      ...config,
      tags: config.tags?.filter((t: string) => t !== tag),
    };

    const updatedDescription = updateDescription(description, config);

    updateGist({
      description: updatedDescription,
      id: gistId,
    });
  };

  return {
    deleteTag,
    ...rest,
  };
};
