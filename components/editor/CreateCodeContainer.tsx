import React from 'react';
import { Editor, OnChange } from '@monaco-editor/react';

import { defaultFontMapper, displayFontMapper } from '@/app/styles/fonts';
import { cn } from '@/lib/utils';

type CreateCodeContainerProps = {
  handleOnChange: OnChange;
  value: string;
};

const options = {
  minimap: { enabled: false },
  lineNumbers: 'off' as const,
  scrollbar: {
    useShadows: false,
    verticalHasArrows: true,
    horizontalHasArrows: true,
    verticalScrollbarSize: 0,
    horizontalScrollbarSize: 17,
    alwaysConsumeMouseWheel: false,
  },
};

const CreateCodeContainer = ({
  handleOnChange,
  value,
}: CreateCodeContainerProps) => {
  function setEditorTheme(monaco: any) {
    monaco.editor.defineTheme('onedark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        {
          token: 'comment',
          foreground: '#5d7988',
          fontStyle: 'italic',
        },
        { token: 'constant', foreground: '#e06c75' },
      ],
      colors: {
        'editor.background': '#0a0a0acc',
      },
    });
  }

  return (
    <div>
      <Editor
        options={options}
        language="javascript"
        value={value}
        beforeMount={setEditorTheme}
        theme="onedark"
        defaultLanguage="javascript"
        defaultValue="// Hello Zist"
        onChange={handleOnChange}
        className={
          (cn(displayFontMapper.Default, defaultFontMapper.Default),
          'relative min-h-[500px] cursor-default w-full text-xl border-stone-700 p-12 px-8 sm:mb-[calc(2vh)] rounded-lg border sm:px-12 sm:shadow-lg')
        }
      />
    </div>
  );
};

export default CreateCodeContainer;
