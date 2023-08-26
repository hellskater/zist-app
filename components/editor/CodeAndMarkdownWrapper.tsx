`use client`;

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai';
import { ReloadIcon } from '@radix-ui/react-icons';

import { Tab } from '@/lib/types/zist';
import { GistData } from '@/lib/types/gist';
import { usePatchGist, usePostGist } from '@/lib/hooks/useGists';
import {
  getDescription,
  getZistConfig,
  updateDescription,
} from '@/lib/hooks/utils';

import Tiptap from '../tiptap';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import FileSelector from '../filters/file-selector';
import TabsContentWrapper from '../ui/tabs-content-wrapper';
import PrivateFilter from '../filters/private-filter';

import CreateCodeContainer from './CreateCodeContainer';
import {
  addNewFile,
  getCreatePayload,
  getUpdatePayload,
  handleFileContentChange,
  handleFileNameChange,
  handleFileTypeChange,
  handleSelectFile,
  randomFileNamesWithExtension,
  removeFile,
  tabsValue,
} from './editor_utils';

const defaultNewFile = {
  id: uuidv4(),
  filename:
    randomFileNamesWithExtension[
      Math.floor(Math.random() * randomFileNamesWithExtension.length)
    ],
  content: '',
  type: 'text/code',
  language: 'Code',
};

type CodeAndMarkdownWrapperProps = {
  parentProps?: GistData;
  isEditing?: boolean;
};

const CodeAndMarkdownWrapper = ({
  parentProps,
  isEditing,
}: CodeAndMarkdownWrapperProps) => {
  const isMarkdownType =
    isEditing && parentProps?.files[0].language === 'Markdown';

  const [currentActiveTab, setCurrentActiveTab] = useState<Tab>(
    isMarkdownType ? tabsValue.MARKDOWN : tabsValue.CODE
  );

  const [remountKey, setRemountKey] = useState(1);

  const { mutateAsync: postGist, isLoading: isPosting } = usePostGist();
  const { mutateAsync: patchGist, isLoading: isPatching } = usePatchGist();

  const [gistData, setGistData] = useState<GistData>(
    isEditing
      ? (parentProps as GistData)
      : {
          id: '',
          description: '',
          public: false,
          files: [defaultNewFile],
        }
  );

  const [selectedFileId, setSelectedFileId] = useState<string | null>(
    gistData.files.length > 0 ? gistData.files[0].id : null
  );

  const handleTabChange = (value: Tab) => {
    setCurrentActiveTab(value);
    handleFileTypeChange(selectedFileId, value.key, gistData, setGistData);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const zistConfig = getZistConfig(gistData.description);
    const updatedDescription = updateDescription(e.target.value, zistConfig);
    setGistData({
      ...gistData,
      description: updatedDescription,
    });
  };

  const handleChangeFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileNameChange(
      selectedFileId,
      e?.target.value,
      gistData,
      setGistData
    );
  };

  const handleChangeFileContent = (value: string | undefined) => {
    handleFileContentChange(selectedFileId, value || '', gistData, setGistData);
  };

  const handleChangeFilecContentMD = (value: string) => {
    handleFileContentChange(selectedFileId, value, gistData, setGistData);
  };

  const handleAddNewFile = () => {
    addNewFile(gistData, setGistData, setSelectedFileId, setCurrentActiveTab);
  };

  const handleFileSelect = (value: string) => {
    const selectedFileType = gistData.files.filter((item) => item.id === value);
    const type = selectedFileType[0].type;
    setRemountKey((previousValue) => previousValue + 1);
    handleSelectFile(value, type, setSelectedFileId, setCurrentActiveTab);
  };

  const handleDeleteFile = () => {
    removeFile(
      selectedFileId,
      gistData,
      setGistData,
      setSelectedFileId,
      setCurrentActiveTab
    );
  };

  const handleSaveFiles = async () => {
    if (isEditing) {
      const updateData = getUpdatePayload(gistData as GistData);
      await patchGist(updateData);
    } else {
      const createData = getCreatePayload(gistData as GistData);
      await postGist(createData);
    }
  };

  const handleTypeToggle = (value: boolean) => {
    setGistData({
      ...gistData,
      public: !value,
    });
  };

  return (
    <div className="lg:ml-6 lg:w-[95%] w-[100%]">
      <div className="flex items-center space-x-4">
        <Input
          onChange={handleDescriptionChange}
          value={getDescription(gistData.description)}
          type="text"
          name="description"
          id="description"
          placeholder="File Description..."
          className="w-full p-2 mt-2 mb-2 rounded-l"
        />
        {!isEditing && (
          <PrivateFilter
            checked={!gistData.public}
            onChange={handleTypeToggle}
          />
        )}
      </div>
      <div className="flex items-center mt-2 mb-2 w-30 space-x-2 hover:border-red-500">
        <Input
          type="text"
          name="name"
          id="name"
          value={
            gistData.files.find((file) => file.id === selectedFileId)
              ?.filename || ''
          }
          onChange={(e) => handleChangeFileName(e)}
          placeholder="File Name"
          className="mt-2 mb-2 w-30"
        />

        {gistData.files.length > 1 && (
          <button
            title="delete this files"
            onClick={handleDeleteFile}
            className="flex items-center text-red-500"
          >
            <AiOutlineDelete />
          </button>
        )}
      </div>
      <div className="flex items-center justify-between  mb-3">
        <Button
          className="cursor-pointer transition-all duration-300 ease-in-out rounded-l hidden md:block md:flex-initial"
          onClick={handleAddNewFile}
        >
          Add file
        </Button>
        <AiOutlineFileAdd
          onClick={handleAddNewFile}
          className="w-6 h-6 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#262525] rounded-l md:hidden"
        />

        <div className="flex items-center gap-8">
          <h3>
            {gistData.files.length === 1
              ? `${gistData.files.length} file`
              : gistData.files.length > 1
              ? `${gistData.files.length} files`
              : ''}
          </h3>
          <FileSelector
            gistData={gistData}
            selectedFileId={selectedFileId}
            onChange={(value) => handleFileSelect(value)}
          />
        </div>
      </div>

      <Tabs defaultValue={tabsValue.CODE.value} value={currentActiveTab.value}>
        <TabsList className="grid md:w-[214px] grid-cols-2 gap-2 mb-2 w-full">
          <TabsTrigger
            onClick={() => handleTabChange(tabsValue.MARKDOWN)}
            value={tabsValue.MARKDOWN.value}
          >
            Markdown
          </TabsTrigger>
          <TabsTrigger
            onClick={() => handleTabChange(tabsValue.CODE)}
            value={tabsValue.CODE.value}
          >
            Code
          </TabsTrigger>
        </TabsList>

        <TabsContentWrapper
          visible={currentActiveTab.key === tabsValue.MARKDOWN.key}
          mount={currentActiveTab.key === tabsValue.MARKDOWN.key}
          value={tabsValue.MARKDOWN.value}
          key={remountKey}
        >
          <Tiptap
            content={
              gistData.files.find((file) => file.id === selectedFileId)
                ?.content || ''
            }
            onChange={(value: string) => handleChangeFilecContentMD(value)}
          />
        </TabsContentWrapper>

        <TabsContentWrapper
          visible={currentActiveTab.key === tabsValue.CODE.key}
          mount
          value={tabsValue.CODE.value}
        >
          <CreateCodeContainer
            value={
              gistData.files.find((file) => file.id === selectedFileId)
                ?.content || ''
            }
            handleOnChange={(value: string | undefined) =>
              handleChangeFileContent(value)
            }
          />
        </TabsContentWrapper>
      </Tabs>
      <div className="flex items-center justify-end pl-2 pt-3">
        {!isEditing ? (
          <Button disabled={isPosting} onClick={handleSaveFiles}>
            {isPosting ? 'Saving' : 'Save'}
            {isPosting && <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        ) : (
          <Button disabled={isPatching} onClick={handleSaveFiles}>
            {isPatching ? 'Updating' : 'Update'}
            {isPatching && <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CodeAndMarkdownWrapper;
