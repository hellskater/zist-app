import { getZistConfig } from './hooks/utils';
import { Gist } from './types/gist';

export const getAllZistsData = (gists: Gist[] | undefined) => {
  let data: Gist[] = [...(gists || [])];

  // filters
  // filter out gists with no files
  data = data.filter((gist: Gist) => {
    if (Object.keys(gist.files).length === 0) {
      return false;
    }
    return true;
  });

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
