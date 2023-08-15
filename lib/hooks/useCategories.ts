import { usePatchGist } from './useGists';
import { getZistConfig, updateDescription } from './utils';

export const useCreateCategory = () => {
  const { mutateAsync: updateGist, ...rest } = usePatchGist();

  const createCategory = async ({
    category,
    description,
    gistId,
  }: {
    category: string;
    description: string;
    gistId: string;
  }) => {
    let config = getZistConfig(description);

    config = {
      ...config,
      category,
    };

    const updatedDescription = updateDescription(description, config);

    await updateGist({
      description: updatedDescription,
      id: gistId,
    });
  };

  return {
    createCategory,
    ...rest,
  };
};

export const useUpdateCategory = () => {
  const { mutateAsync: updateGist, ...rest } = usePatchGist();

  const updateCategory = async ({
    category,
    description,
    gistId,
  }: {
    category: string;
    description: string;
    gistId: string;
  }) => {
    let config = getZistConfig(description);

    config = {
      ...config,
      category,
    };

    const updatedDescription = updateDescription(description, config);

    await updateGist({
      description: updatedDescription,
      id: gistId,
    });
  };

  return {
    updateCategory,
    ...rest,
  };
};

export const useDeleteCategory = () => {
  const { mutateAsync: updateGist, ...rest } = usePatchGist();

  const deleteCategory = async ({
    description,
    gistId,
  }: {
    category: string;
    description: string;
    gistId: string;
  }) => {
    let config = getZistConfig(description);

    delete config.category;

    const updatedDescription = updateDescription(description, config);

    await updateGist({
      description: updatedDescription,
      id: gistId,
    });
  };

  return {
    deleteCategory,
    ...rest,
  };
};
