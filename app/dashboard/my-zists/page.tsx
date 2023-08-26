'use client';

import { useMemo, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

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
import { Filters, SortOrder, Sorts } from '@/lib/types/zist';
import CategoryFilter from '@/components/filters/category-filter';
import LanguageFilter from '@/components/filters/language-filter';
import TagsFilter from '@/components/filters/tags-filter';
import PrivateFilter from '@/components/filters/private-filter';
import SortDropdown from '@/components/sorts/sort';
import SortOrderDropdown from '@/components/sorts/sort-order';

const MyZistsPage = () => {
  const [filter, setFilter] = useState<Filters>();
  const [sort, setSort] = useState<Sorts>('updated');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const { ref, inView } = useInView();

  const {
    data: gists,
    isPending,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetAllGistsOfAuthenticatedUser();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const allGists = gists?.pages?.reduce((acc, curr) => {
    return [...acc, ...curr];
  }, []);

  const data = useMemo(
    () => getAllZistsData(allGists, filter as Filters, sort, sortOrder),
    [allGists, filter, sort, sortOrder]
  );

  const categories = useMemo(() => getAllCategories(allGists), [allGists]);

  const allTags = useMemo(() => getAllTags(allGists), [allGists]);

  const languages = useMemo(() => getAllLanguages(allGists), [allGists]);

  const getGists = () => {
    return (
      data?.map((gist: Gist) => {
        return (
          <PreviewCard
            files={gist.files}
            key={gist.id}
            description={gist.description}
            categories={categories}
            gistId={gist.id}
            allTags={allTags}
            updated_at={gist.updated_at}
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

      <section className="mt-8">
        <h2 className="text-2xl font-bold">Sorts</h2>
        <div className="flex items-center gap-10 mt-5 flex-wrap">
          <SortDropdown
            selectedSort={sort}
            setSelectedSort={(value) => setSort(value)}
          />
          <SortOrderDropdown
            selectedSortOrder={sortOrder}
            setSelectedSortOrder={(value) => setSortOrder(value)}
          />
        </div>
      </section>

      <section className="flex items-center gap-10 2xl:gap-14 mt-10 flex-wrap">
        {isPending ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full lg:w-[calc(50%-2.5rem)] 2xl:w-[30%] h-96 rounded-2xl"
            />
          ))
        ) : getGists().length > 0 ? (
          <>
            {getGists()}
            {isFetchingNextPage &&
              Array.from({ length: 12 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-full lg:w-[calc(50%-2.5rem)] 2xl:w-[30%] h-96 rounded-2xl"
                />
              ))}
            <div ref={ref} />
          </>
        ) : (
          <p>No gists found</p>
        )}
      </section>
    </div>
  );
};

export default MyZistsPage;
