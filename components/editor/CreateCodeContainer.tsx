import { MouseEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GistCreatePayload, usePostGist } from '@/lib/hooks/useGists';
import { extensionToLanguage } from '@/lib/constants/language';

import CodeEditor from './CodeEditor';

type Props = {
  isOpen: boolean;
  handleCloseDialog: MouseEventHandler<HTMLButtonElement>;
};

const config = {
  minimap: { enabled: false },
  autoClosingBrackets: true,
  lineNumbers: false,
  overviewRulerLanes: 0,
  bracketPairColorization: true,
  autoClosingQuotes: true,
  scrollbar: {
    verticalScrollbarSize: 5,
    horizontalScrollbarSize: 5,
  },
};

function CreateCodeContainer({}: Props) {
  const [code, setCode] = useState('');
  const [fileMeta, setFileMeta] = useState({
    name: '',
    description: '',
    tags: [],
  });

  const postGistMutation = usePostGist();

  const handleOnChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setCode(newValue);
    }
  };

  const handleFileMetaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFileMeta((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const extension = fileMeta?.name.split('.').pop();
    const filename = fileMeta.name;

    const data: GistCreatePayload = {
      description: fileMeta.description,
      files: {
        [filename]: {
          content: code,
          language: extensionToLanguage[extension as string],
          filename: filename,
        },
      },
      public: true,
    };
    await postGistMutation.mutateAsync(data);
  };

  return (
    <div>
      <Input
        onChange={handleFileMetaChange}
        value={fileMeta.description}
        type="text"
        name="description"
        id="description"
        placeholder="File Description..."
        className="p-2 mt-2 mb-2 rounded-l"
      />

      <div className="p-4px border-2 rounded-xl border-input">
        <div className="rounded-t-8 flex bg-[#151718]">
          <Input
            onChange={handleFileMetaChange}
            value={fileMeta.name}
            type="text"
            name="name"
            id="name"
            placeholder="File Name"
            className="p-2 mt-2 mb-2 ml-2 w-30"
          />
        </div>
        <div className="p-2 border border-1 border-input">
          <div className="grid gap-4 py-4">
            <CodeEditor
              language="javascript"
              theme="vs-dark"
              options={config}
              value={code}
              handleOnChange={handleOnChange}
            />
          </div>
          <section>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
export default CreateCodeContainer;
