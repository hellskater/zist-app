'use client';

import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';

import 'highlight.js/styles/base16/seti-ui.css';
import { useGetGistFile } from '@/lib/hooks/useGists';
import { extensionToLanguage } from '@/lib/constants/language';

import { Skeleton } from '../ui/skeleton';
import CopyButton from '../copy-button';

type Props = {
  fileName: string | undefined;
  fileUrl: string | undefined;
};

const CodePreview = ({ fileName, fileUrl }: Props) => {
  const { data: value, isLoading: isDataLoading } = useGetGistFile(fileUrl);

  const language = extensionToLanguage[fileName?.split('.')[1] || ''];

  const codeEl = useRef(null);

  useEffect(() => {
    if (isDataLoading) return;
    if (!value) return;
    hljs.highlightBlock(codeEl.current as unknown as HTMLElement);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, value]);

  const getValue = () => {
    if (typeof value === 'string') {
      // only include the first 1000 characters
      return value;
    } else {
      return JSON.stringify(value, null, 2);
    }
  };

  if (isDataLoading) {
    return <Skeleton className="max-h-40 h-40 w-full" />;
  }

  return (
    <pre className="h-full w-full text-base relative rounded-lg overflow-hidden">
      <div className="absolute top-3 right-3">
        <CopyButton value={value} />
      </div>
      <code ref={codeEl} className={`h-full ${language}`}>
        {getValue()}
      </code>
    </pre>
  );
};

export default CodePreview;
