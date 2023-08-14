'use client';

import PreviewCard, { GistFileData } from '@/components/preview/preview-card';
import Search from '@/components/search';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllGists } from '@/lib/hooks/useGists';

const DashboardPage = () => {
  const { data: gists, isLoading } = useGetAllGists();

  const getGists = () => {
    return (
      gists?.map(
        (gist: {
          id: string;
          files: {
            [key: string]: GistFileData;
          };
        }) => {
          return (
            <PreviewCard data={Object.values(gist.files)[0]} key={gist.id} />
          );
        }
      ) || []
    );
  };

  console.log(gists);
  return (
    <div className="min-h-screen">
      <Search
        value=""
        onChange={(value) => console.log(value)}
        placeholder="Search..."
      />
      <section className="flex items-center gap-10 mt-20 flex-wrap">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full lg:w-[calc(50%-2.5rem)] h-80 rounded-2xl"
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

export default DashboardPage;
