import { usePatchGist } from './useGists';
import { getZistConfig, updateDescription } from './utils';

export const useCategoryAndTags = () => {
  const { mutateAsync: updateGist, ...rest } = usePatchGist();

  const updateCategoryAndTags = async ({
    category,
    tags,
    description,
    gistId,
  }: {
    category?: string;
    tags?: string[];
    description: string;
    gistId: string;
  }) => {
    let config = getZistConfig(description);

    config = {
      ...config,
      ...(category && { category }),
      ...(tags && { tags }),
    };

    const updatedDescription = updateDescription(description, config);

    await updateGist({
      description: updatedDescription,
      id: gistId,
    });
  };

  return {
    updateCategoryAndTags,
    ...rest,
  };
};
