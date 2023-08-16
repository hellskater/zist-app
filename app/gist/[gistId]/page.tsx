'use client';

import { useEffect, useState } from 'react';
import { VscFiles } from 'react-icons/vsc';

import { useGetGistById, useGetGistFile } from '@/lib/hooks/useGists';
import { getDescription } from '@/lib/hooks/utils';
import Files from '@/components/gist/files';
import CodePreview from '@/components/gist/code-preview';
import EditorPreview from '@/components/gist/editor-preview';

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
        <p>Gist not found</p>
      </div>
    );
  }

  const description = getDescription(gistData?.description || '');
  const numberOfFiles = Object.keys(gistData?.files || {}).length;

  const isMarkdown = selectedFile?.endsWith('.md');

  return (
    <div className="min-h-screen pt-10 pr-10">
      <section className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Description</h1>
          <p className="text-base w-full mt-3 text-gray-300">
            {description || 'No description'}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-gray-200">
            <VscFiles />
            <p>
              {numberOfFiles} file{numberOfFiles > 1 ? 's' : ''}
            </p>
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
