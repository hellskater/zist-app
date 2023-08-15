'use client';

import { useMemo, useState } from 'react';

import PreviewCard from '@/components/preview/preview-card';
import Search from '@/components/search';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getAllCategories,
  getAllLanguages,
  getAllTags,
  getAllZistsData,
} from '@/lib/dataFilters';
import { useGetAllGistsOfAuthenticatedUser } from '@/lib/hooks/useGists';
import { Gist } from '@/lib/types/gist';
import { Filters } from '@/lib/types/zist';
import CategoryFilter from '@/components/filters/category-filter';
import LanguageFilter from '@/components/filters/language-filter';
import TagsFilter from '@/components/filters/tags-filter';
import PrivateFilter from '@/components/filters/private-filter';

const MyZistsPage = () => {
  const [filter, setFilter] = useState<Filters>();

  const { data: gists, isLoading } = useGetAllGistsOfAuthenticatedUser();

  const data = useMemo(
    () => getAllZistsData(gists, filter as Filters),
    [gists, filter]
  );

  const categories = useMemo(() => getAllCategories(gists), [gists]);

  const allTags = useMemo(() => getAllTags(gists), [gists]);

  const languages = useMemo(() => getAllLanguages(gists), [gists]);

  const getGists = () => {
    return (
      data?.map((gist: Gist) => {
        return (
          <PreviewCard
            data={Object.values(gist.files)[0]}
            key={gist.id}
            description={gist.description}
            categories={categories}
            gistId={gist.id}
            allTags={allTags}
            numberOfFiles={Object.keys(gist.files).length}
          />
        );
      }) || []
    );
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mt-2">My Zists</h1>
      <section className="mt-10">
        <Search
          searchInput={filter?.search || ''}
          setSearchInput={(value) => setFilter({ ...filter, search: value })}
        />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">Filters</h2>
        <div className="flex items-center gap-10 mt-5 flex-wrap">
          <CategoryFilter
            allCategories={categories}
            selectedCategory={filter?.category}
            setSelectedCategory={(value) =>
              setFilter({ ...filter, category: value })
            }
          />
          <LanguageFilter
            allLanguages={languages}
            selectedLanguage={filter?.language}
            setSelectedLanguage={(value) =>
              setFilter({ ...filter, language: value })
            }
          />
          <PrivateFilter
            checked={filter?.private || false}
            onChange={(value) => setFilter({ ...filter, private: value })}
          />
        </div>

        <div className={`mt-10 ${allTags.length === 0 ? 'hidden' : ''}`}>
          <h2 className="text-2xl font-bold mb-5">Tags</h2>
          <TagsFilter
            allTags={allTags}
            selectedTags={filter?.tags}
            setSelectedTags={(value) => setFilter({ ...filter, tags: value })}
          />
        </div>
      </section>

      <section className="flex items-center gap-10 mt-10 flex-wrap">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full lg:w-[calc(50%-2.5rem)] h-96 rounded-2xl"
            />
          ))
        ) : getGists().length > 0 ? (
          getGists()
        ) : (
          <p>No gists found</p>
        )}
      </section>
    </div>
  );
};

export default MyZistsPage;
