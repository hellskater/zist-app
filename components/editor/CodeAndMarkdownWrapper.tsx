`use client`;

import React, { useState } from 'react';

import { TabsView } from '@/lib/types/zist';

import Tiptap from '../tiptap';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import FileSelector from '../filters/file-selector';
import TabsContentWrapper from '../ui/tabs-content-wrapper';

import CreateCodeContainer from './CreateCodeContainer';

const tabsValue: TabsView = {
  MARKDOWN: 'markdown',
  CODE: 'code',
};

function CodeAndMarkdownWrapper() {
  const [currentActiveTab, setCurrentActiveTab] = useState<string>(
    tabsValue.MARKDOWN
  );

  const defaultNewFile = {
    type: tabsValue.MARKDOWN,
    name: 'default',
    _id: Math.random() * 10,
  };
  const [fileMeta, setFileMeta] = useState({
    description: '',
    tags: [],
  });

  const [files, setFiles] = useState([
    {
      name: 'default',
      _id: 1,
      type: tabsValue.MARKDOWN,
    },
  ]);

  const [currentFile, setCurrentFile] = useState('');

  const handleFileMetaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFileMeta((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFile(event?.target.value);
  };

  const handleAddFile = () => {
    setFiles([...files, defaultNewFile]);
  };

  const handleTabChange = (value: string) => {
    setCurrentActiveTab(value);
  };
  console.log('FILES', files);

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
      <Input
        onChange={handleChangeFileName}
        value={currentFile}
        type="text"
        name="name"
        id="name"
        placeholder="File Name"
        className="p-2 mt-2 mb-2 w-30"
      />
      <div className="flex items-center justify-between  mb-3">
        <Button onClick={handleAddFile}>Add file</Button>

        <div className="flex items-center gap-8">
          <h3>
            {files.length === 1
              ? `${files.length} file`
              : files.length > 1
              ? `${files.length} files`
              : ''}
          </h3>
          <FileSelector
            allFiles={files.map((item) => item.name)}
            selectedFile={currentFile}
            setCurrentFile={(value) => setCurrentFile(value)}
          />
        </div>
      </div>

      <Tabs defaultValue={tabsValue.MARKDOWN}>
        <TabsList className="grid grid-cols-2 mb-2 w-[214px]">
          <TabsTrigger
            onClick={() => handleTabChange(tabsValue.MARKDOWN)}
            value={tabsValue.MARKDOWN}
          >
            Markdown
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleTabChange(tabsValue.CODE)}
            value={tabsValue.CODE}
          >
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContentWrapper
          visible={currentActiveTab === tabsValue.MARKDOWN}
          mount
          value={tabsValue.CODE}
        >
          <Tiptap />
        </TabsContentWrapper>

        <TabsContentWrapper
          visible={currentActiveTab === tabsValue.CODE}
          mount
          value={tabsValue.CODE}
        >
          <CreateCodeContainer />
        </TabsContentWrapper>
      </Tabs>
      <div></div>
    </div>
  );
}

export default CodeAndMarkdownWrapper;
