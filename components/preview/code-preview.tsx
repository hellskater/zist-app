'use client';

import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/seti-ui.css';

const language = 'react';
const value = `import { useQuery } from 'react-query';
import { useSession } from 'next-auth/client';

import { getPosts } from '../api/posts';

export default function Posts() {
    const [session] = useSession();
    const { data, isLoading, isError } = useQuery('posts', getPosts);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {data.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}`;

const CodePreview = () => {
  const codeEl = useRef(null);

  useEffect(() => {
    hljs.highlightBlock(codeEl.current as unknown as HTMLElement);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, value]);

  return (
    <pre>
      <code ref={codeEl} className={language}>
        {value}
      </code>
    </pre>
  );
};

export default CodePreview;
