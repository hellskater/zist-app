'use client';

import PreviewCard from '@/components/preview/preview-card';
import Search from '@/components/search';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getAllCategories,
  getAllTags,
  getAllZistsData,
} from '@/lib/dataFilters';
import { useGetAllGistsOfAuthenticatedUser } from '@/lib/hooks/useGists';
import { Gist } from '@/lib/types/gist';

const MyZistsPage = () => {
  const { data: gists, isLoading } = useGetAllGistsOfAuthenticatedUser();

  const data = getAllZistsData(gists);

  const categories = getAllCategories(gists);

  const allTags = getAllTags(gists);

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
          gists={data?.map((gist: Gist) => Object.values(gist.files)[0]) || []}
        />
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
