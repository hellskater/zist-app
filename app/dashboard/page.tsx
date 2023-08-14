'use client';

import PreviewCard, { GistFileData } from '@/components/preview/preview-card';
import Search from '@/components/search';
import { useGetAllGists } from '@/lib/hooks/useGists';

const DashboardPage = () => {
  const { data: gists } = useGetAllGists();

  console.log(gists);
  return (
    <div className="min-h-screen">
      <Search
        value=""
        onChange={(value) => console.log(value)}
        placeholder="Search..."
      />
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {gists?.map(
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
      )}
    </div>
  );
};

export default DashboardPage;
