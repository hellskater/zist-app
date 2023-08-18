import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';

// import { GistCreatePayload, usePostGist } from '@/lib/hooks/useGists';
// import { extensionToLanguage } from '@/lib/constants/language';
import { defaultFontMapper, displayFontMapper } from '@/app/styles/fonts';
import { cn } from '@/lib/utils';

import './monaco-theme';

type CreateCodeContainerProps = {};

const options = {
  minimap: { enabled: false },
  lineNumbers: undefined,
  overviewRulerLanes: 0,
  scrollbar: {
    verticalScrollbarSize: 5,
    horizontalScrollbarSize: 5,
  },
};

const CreateCodeContainer: React.FC<CreateCodeContainerProps> = ({}) => {
  const [code, setCode] = useState('');
  // const [fileMeta, setFileMeta] = useState({
  //   name: '',
  //   description: '',
  //   tags: [],
  // });

  // const postGistMutation = usePostGist();

  const handleOnChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setCode(newValue);
    }
  };

  // const handleFileMetaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setFileMeta((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async () => {
  //   const extension = fileMeta?.name.split('.').pop();
  //   const filename = fileMeta.name;

  //   const data: GistCreatePayload = {
  //     description: fileMeta.description,
  //     files: {
  //       [filename]: {
  //         content: code,
  //         language: extensionToLanguage[extension as string],
  //         filename: filename,
  //       },
  //     },
  //     public: true,
  //   };
  //   await postGistMutation.mutateAsync(data);
  // };

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
        value={code}
        beforeMount={setEditorTheme}
        theme="onedark"
        defaultLanguage="javascript"
        defaultValue="// Hello Zist"
        onChange={handleOnChange}
        className={
          (cn(displayFontMapper.Default, defaultFontMapper.Default),
          'relative min-h-[500px] w-full text-xl max-w-screen-lg border-stone-700 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg')
        }
      />
    </div>
  );
};

export default CreateCodeContainer;
