'use client';

import { useEffect, useState } from 'react';

import PreviewCard, { GistFileData } from '@/components/preview/preview-card';
import Search from '@/components/search';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllGists, useGetGist } from '@/lib/hooks/useGists';

const MyZistsPage = () => {
  const [configUrl, setConfigUrl] = useState<any>();
  const { data: gists, isLoading } = useGetAllGists();

  const { data: config } = useGetGist(configUrl);

  useEffect(() => {
    if (gists) {
      gists?.forEach((gist: { files: { [x: string]: any } }) => {
        if (gist.files['zist.config.json']) {
          setConfigUrl(gist.files['zist.config.json'].raw_url);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gists]);

  const getData = () => {
    let data: any = [...(gists || [])];
    // filters
    // filter out gists with zist.config.json
    data = data.filter((gist: { files: { [x: string]: any } }) => {
      if (gist.files['zist.config.json']) {
        return false;
      }
      return true;
    });
    // filter out gists with no files
    data = data.filter((gist: { files: { [x: string]: any } }) => {
      if (Object.keys(gist.files).length === 0) {
        return false;
      }
      return true;
    });

    return data;
  };

  const data = getData();

  const getGists = () => {
    return (
      data?.map(
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

  console.log(config);
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-bold mt-2">My Zists</h1>
      <section className="mt-10">
        <Search
          gists={
            data?.map(
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
