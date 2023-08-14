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

  return (
    <pre className="h-40 w-full">
      <code ref={codeEl} className={`h-full ${language}`}>
        {value}
      </code>
    </pre>
  );
};

export default CodePreview;
