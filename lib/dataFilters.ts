import { extensionToLanguage } from './constants/language';
import { getDescription, getZistConfig } from './hooks/utils';
import { Gist } from './types/gist';
import { Filters } from './types/zist';

export const getAllZistsData = (gists: Gist[] | undefined, filter: Filters) => {
  let data: Gist[] = [...(gists || [])];

  // filters
  // filter out gists with no files
  data = data.filter((gist: Gist) => {
    if (Object.keys(gist.files).length === 0) {
      return false;
    }
    return true;
  });

  // category
  if (filter?.category) {
    data = data.filter((gist: Gist) => {
      const { category } = getZistConfig(gist.description);

      if (category === filter.category) {
        return true;
      }
      return false;
    });
  }

  // tags
  if (filter?.tags && filter?.tags.length > 0) {
    data = data.filter((gist: Gist) => {
      const { tags } = getZistConfig(gist.description);
      if (tags) {
        const hasTag = tags.some((tag: string) => filter.tags?.includes(tag));

        if (hasTag) {
          return true;
        }
      }
      return false;
    });
  }

  // language
  if (filter?.language) {
    data = data.filter((gist: Gist) => {
      let hasLanguage = false;

      Object.keys(gist.files).forEach((file: string) => {
        const extension = file.split('.').pop();

        const language = extensionToLanguage[extension as string];

        if (language === filter.language) {
          hasLanguage = true;
        }
      });

      if (hasLanguage) {
        return true;
      }
      return false;
    });
  }

  // private
  if (filter?.private) {
    data = data.filter((gist: Gist) => {
      if (gist.public === !filter.private) {
        return true;
      }
      return false;
    });
  }

  // search
  if (filter?.search) {
    data = data.filter((gist: Gist) => {
      const description = getDescription(gist.description);
      const files = Object.keys(gist.files).join(' ');

      if (
        description
          .toLowerCase()
          .includes((filter?.search as string).toLowerCase()) ||
        files.toLowerCase().includes((filter?.search as string).toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }

  // sorts
  // sort by date
  data = sortZistsByDate(data);

  return data;
};

export const sortZistsByDate = (gists: Gist[] | undefined) => {
  let data: Gist[] = [...(gists || [])];

  data = data.sort((a: Gist, b: Gist) => {
    const aDate = new Date(a.updated_at);
    const bDate = new Date(b.updated_at);

    return bDate.getTime() - aDate.getTime();
  });

  return data;
};

export const getAllCategories = (gists: Gist[] | undefined) => {
  let categories: string[] = [];

  gists?.forEach((gist: Gist) => {
    const { category } = getZistConfig(gist.description);

    if (category) {
      categories.push(category);
    }
  });

  categories = Array.from(new Set(categories));

  return categories;
};

export const getAllTags = (gists: Gist[] | undefined) => {
  let tagsData: string[] = [];

  gists?.forEach((gist: Gist) => {
    const { tags } = getZistConfig(gist.description);

    if (tags) {
      tagsData = [...tagsData, ...tags];
    }
  });

  tagsData = Array.from(new Set(tagsData));

  return tagsData;
};

export const getAllLanguages = (gists: Gist[] | undefined) => {
  let languages: string[] = [];

  gists?.forEach((gist: Gist) => {
    Object.keys(gist.files).forEach((file: string) => {
      const extension = file.split('.').pop();

      const language = extensionToLanguage[extension as string];

      if (language) {
        languages.push(language);
      }
    });
  });

  languages = Array.from(new Set(languages));

  return languages;
};
