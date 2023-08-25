'use client';

import React, { useEffect, useState } from 'react';

import { useGetGistById } from '@/lib/hooks/useGists';
import { Skeleton } from '@/components/ui/skeleton';
import CodeAndMarkdownWrapper from '@/components/editor/CodeAndMarkdownWrapper';
import { constructPayload } from '@/components/editor/editor_utils';
import { GistData } from '@/lib/types/gist';

function EditGist({ params }: { params: { gistId: string } }) {
  const { data: singleGistResponseData, isLoading: isGistLoading } =
    useGetGistById(params?.gistId);

  const [parentProps, setParentProps] = useState<GistData | null>(null);

  useEffect(() => {
    if (singleGistResponseData) {
      const rv = constructPayload(singleGistResponseData);
      setParentProps(rv);
    }
  }, [singleGistResponseData]);

  if (!singleGistResponseData && !isGistLoading) {
    return (
      <div>
        <p>Gist not found</p>
      </div>
    );
  }

  if (isGistLoading) {
    return (
      <Skeleton className="w-full lg:w-[calc(50%-2.5rem)] h-96 rounded-2xl" />
    );
  }

  if (parentProps) {
    return <CodeAndMarkdownWrapper parentProps={parentProps} onEdit />;
  }
}

export default EditGist;
