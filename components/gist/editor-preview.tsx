'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';

import { displayFontMapper, defaultFontMapper } from '@/app/styles/fonts';
import { cn } from '@/lib/utils';
import { useGetGistFile } from '@/lib/hooks/useGists';

import { Skeleton } from '../ui/skeleton';
import { TiptapExtensions } from '../tiptap/extensions';
import { TiptapEditorProps } from '../tiptap/props';

import CopyMarkdown from './copy-markdown';

// import { EditorBubbleMenu } from '../tiptap/components/bubble-menu';
// import { ImageResizer } from '../tiptap/components/image-resizer';

type Props = {
  fileUrl: string | undefined;
};

export default function EditorPreview({ fileUrl }: Props) {
  const { data: content, isLoading: isDataLoading } = useGetGistFile(fileUrl);
  const [hydrated, setHydrated] = useState(false);
  const [readableContent, setReadableContent] = useState('');

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
  });

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);

      editor.setEditable(false);

      setReadableContent(editor.getText());
    }
  }, [editor, content, hydrated]);

  if (isDataLoading) {
    return <Skeleton className="max-h-40 h-40 w-full" />;
  }

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className={
        (cn(displayFontMapper.Default, defaultFontMapper.Default),
        'relative h-full text-white w-full text-xl bg-[#0a0a0a] p-12 px-8 sm:mb-[calc(20vh)] rounded-lg border sm:px-12 sm:shadow-lg')
      }
    >
      <div className="absolute top-3 right-3">
        <CopyMarkdown markdown={content} content={readableContent} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
