'use client';

import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/seti-ui.css';

type Props = {
  value: string;
  language: string;
};

const CodePreview = ({ value, language }: Props) => {
  const codeEl = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeEl.current as unknown as HTMLElement);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, value]);

  const getValue = () => {
    if (typeof value === 'string') {
      // only include the first 1000 characters
      return value.substring(0, 100);
    } else {
      return JSON.stringify(value, null, 2);
    }
  };

  return (
    <pre className="max-h-40 h-40 w-full">
      <code
        style={{ overflow: 'hidden' }}
        ref={codeEl}
        className={`h-full ${language}`}
      >
        {getValue()}
      </code>
    </pre>
  );
};

export default CodePreview;
