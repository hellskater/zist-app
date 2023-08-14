'use client';

import PreviewCard, { GistFileData } from '@/components/preview/preview-card';
import Search from '@/components/search';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllGists } from '@/lib/hooks/useGists';

const MyZistsPage = () => {
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
      <h1 className="text-4xl font-bold mt-2">My Zists</h1>
      <section className="mt-10">
        <Search
          gists={
            gists?.map(
              (gist: { files: GistFileData[] }) => Object.values(gist.files)[0]
            ) || []
          }
        />
      </section>

      <section className="flex items-center gap-10 mt-10 flex-wrap">
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

export default MyZistsPage;
