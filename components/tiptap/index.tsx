'use client';

import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { useDebouncedCallback } from 'use-debounce';

// import useLocalStorage from '@/lib/hooks/use-local-storage';
import { displayFontMapper, defaultFontMapper } from '@/app/styles/fonts';
import { cn } from '@/lib/utils';

import { TiptapExtensions } from './extensions';
import { TiptapEditorProps } from './props';
import { EditorBubbleMenu } from './components/bubble-menu';
import { ImageResizer } from './components/image-resizer';

interface EditorProps {
  content: string;
  onChange: Function;
}

const Editor: React.FC<EditorProps> = ({ content, onChange }) => {
  // const [saveStatus, setSaveStatus] = useState('Saved');

  const [hydrated, setHydrated] = useState(false);

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const markdown = editor.storage.markdown.getMarkdown();
    // setSaveStatus('Saving...');
    // setContent(markdown);
    onChange(markdown);

    // Simulate a delay in saving.
    setTimeout(() => {
      // setSaveStatus('Saved');
    }, 500);
  }, 750);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      // setSaveStatus('Unsaved');
      debouncedUpdates(e);
    },
    autofocus: 'end',
  });

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className={
        (cn(displayFontMapper.Default, defaultFontMapper.Default),
        'relative min-h-[500px] w-full text-xl border-stone-700 p-12 px-8 sm:mb-[calc(2vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg')
      }
    >
      {/* <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-700 px-2 py-1 text-sm text-stone-200">
        {saveStatus}
      </div> */}
      {editor && <EditorBubbleMenu editor={editor} />}
      {editor?.isActive('image') && <ImageResizer editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};
export default Editor;
