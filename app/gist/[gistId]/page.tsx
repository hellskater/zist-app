'use client';

import { useEffect, useState } from 'react';
import { VscFiles } from 'react-icons/vsc';

import { useGetGistById, useGetGistFile } from '@/lib/hooks/useGists';
import { getDescription } from '@/lib/hooks/utils';
import Files from '@/components/gist/files';
import EditorPreview from '@/components/gist/editor-preview';
import CodePreview from '@/components/gist/code-preview';
import ContentNotFound from '@/components/content-not-found';
import { Skeleton } from '@/components/ui/skeleton';

const GistPage = ({ params }: { params: { gistId: string } }) => {
  const { data: gistData, isLoading: isGistLoading } = useGetGistById(
    params?.gistId
  );
  const [selectedFile, setSelectedFile] = useState('');

  // starting the fetch of the file
  useGetGistFile(gistData?.files[selectedFile]?.raw_url);

  useEffect(() => {
    if (gistData) {
      setSelectedFile(Object.keys(gistData?.files)[0]);
    }
  }, [gistData]);

  if (!gistData && !isGistLoading) {
    return (
      <div>
        <ContentNotFound
          header="Gist not found."
          showImage
          imageURL="/empty-space.png"
          message="Looks like the gist you are looking for is not there."
          showButton={false}
          buttonText=""
          redirectURL=""
        />
      </div>
    );
  }

  const description = getDescription(gistData?.description || '');
  const numberOfFiles = Object.keys(gistData?.files || {}).length;

  const isMarkdown = selectedFile?.endsWith('.md');

  if (isGistLoading) {
    return (
      <Skeleton className="w-full lg:w-[calc(50%-2.5rem)] h-96 rounded-2xl" />
    );
  }

  return (
    <div className="min-h-screen pt-10 sm:pr-2 xs:pr-2">
      <section className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col w-full items-start pb-8">
          <h1 className="text-2xl xs:text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-white">
            Description
          </h1>
          <p className="text-base w-full mt-3 text-gray-300">
            {description || 'No description'}
          </p>
        </div>

        <div className="flex items-center justify-end gap-5 w-[100%]">
          <div className="flex items-center gap-2 text-gray-200">
            {numberOfFiles} <VscFiles />
          </div>
          <Files
            files={Object.keys(gistData?.files || {})}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />
        </div>
      </section>

      <section className="mt-10">
        {!isMarkdown ? (
          <CodePreview
            key={selectedFile}
            fileName={selectedFile}
            fileUrl={gistData?.files[selectedFile]?.raw_url}
          />
        ) : (
          <EditorPreview fileUrl={gistData?.files[selectedFile]?.raw_url} />
        )}
      </section>
    </div>
  );
};

export default GistPage;
