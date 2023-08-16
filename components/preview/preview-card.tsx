import { BsFileEarmarkText, BsFiletypeXml } from 'react-icons/bs';
import { VscFiles, VscJson } from 'react-icons/vsc';
import { SiYaml } from 'react-icons/si';
import { FaCode } from 'react-icons/fa';
import { useCallback, useState } from 'react';
import { AiFillEdit, AiOutlineTags } from 'react-icons/ai';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import { useCompletion } from 'ai/react';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

import { useGetGistFile } from '@/lib/hooks/useGists';
import { Skeleton } from '@/components/ui/skeleton';
import { extensionToLanguage } from '@/lib/constants/language';
import { Files, Gist } from '@/lib/types/gist';
import { getDescription, getZistConfig } from '@/lib/hooks/utils';
import { truncateString } from '@/lib/utils';
import useGetAllFilesOfGist from '@/lib/hooks/useGetAllFilesOfGist';
import {
  useCreateCategory,
  useUpdateCategory,
} from '@/lib/hooks/useCategories';
import { useUpdateTags } from '@/lib/hooks/useTags';

import CodePreview from './code-preview';
import CategoryCommand from './category/category-command';
import TagsDialog from './tags/tags-dialog';

type PreviewCardProps = {
  files: Files;
  description: string;
  categories: string[];
  gistId: string;
  allTags: string[];
};

const PreviewCard = ({
  files,
  description,
  gistId,
  categories,
  allTags,
}: PreviewCardProps) => {
  const data = files[Object.keys(files)[0]];
  const numberOfFiles = Object.keys(files).length;
  const { data: gistContent } = useGetGistFile(data?.raw_url);

  const { getFilesData } = useGetAllFilesOfGist();

  const queryClient = useQueryClient();

  const { updateCategory } = useUpdateCategory();

  const { createCategory } = useCreateCategory();

  const { updateTags } = useUpdateTags();

  const { complete, isLoading: isAutoTagging } = useCompletion({
    api: '/api/categorise',
  });

  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState(false);

  const { category, tags = [] } = getZistConfig(description);

  const descriptionText = getDescription(description);

  const language = data?.language.toLowerCase();

  const extension = data?.filename.split('.').pop();

  const languageIcon = extensionToLanguage[extension as string];

  const getIcon = () => {
    if (language === 'text') {
      return <BsFileEarmarkText className="text-3xl text-white" />;
    } else if (language === 'json') {
      return <VscJson className="text-3xl text-white" />;
    } else if (language === 'yaml') {
      return <SiYaml className="text-3xl text-white" />;
    } else if (language === 'xml') {
      return <BsFiletypeXml className="text-3xl text-white" />;
    } else if (languageIcon) {
      return (
        <i className={`devicon-${languageIcon}-original text-white text-3xl`} />
      );
    } else {
      return <FaCode className="text-3xl text-white" />;
    }
  };

  const handleAutoTag = useCallback(async () => {
    // {availableTags:[string, string], availableCategories: [string, string], files: [{fileName:string , fileContent:string}]}

    const filesData = await getFilesData(files);

    const payload = {
      description: getDescription(description),
      availableTags: allTags,
      availableCategories: categories,
      files: filesData,
    };

    const response = await complete(JSON.stringify(payload));

    if (!response) {
      toast.error('Failed to auto tag!');
      return;
    }

    try {
      const parsedResponse = JSON.parse(response);

      // category
      if (parsedResponse?.category) {
        if (categories.includes(parsedResponse?.category)) {
          await updateCategory({
            category: parsedResponse?.category,
            description,
            gistId,
          });
        } else {
          await createCategory({
            category: parsedResponse?.category,
            description,
            gistId,
          });
        }
      }

      // tags

      if (parsedResponse?.tags) {
        const newGistData = (await queryClient.getQueryData([
          'gist',
          gistId,
        ])) as Gist;
        await updateTags({
          gistId,
          description: newGistData?.description || description,
          tags: parsedResponse?.tags,
        });
      }

      toast.success('Auto tag successful!');
    } catch {
      toast.error('Failed to auto tag!');
    }
  }, [complete]);

  return (
    <div className="w-full relative lg:w-[calc(50%-1.25rem)] h-96 border-2 rounded-2xl overflow-hidden">
      <section>
        {gistContent ? (
          <CodePreview value={gistContent} language={language} />
        ) : (
          <Skeleton className="w-full h-40" />
        )}
      </section>
      <section className="p-5">
        <div className="flex items-center gap-10">
          <p className="text-lg">{data?.filename}</p>
          {getIcon()}
          <CategoryCommand
            gistId={gistId}
            description={description}
            categories={categories}
            category={category || ''}
          />
        </div>
      </section>

      <section className="px-5">
        {tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`bg-zinc-800 text-white px-3 py-1 rounded-md text-sm`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div onClick={() => setIsTagsDialogOpen(true)} title="Edit tags">
              <AiFillEdit className="text-white text-3xl cursor-pointer hover:bg-zinc-900 p-1 transition-all duration-300 rounded-md" />
            </div>
          </div>
        ) : (
          <div
            onClick={() => setIsTagsDialogOpen(true)}
            className="flex text-sm items-center gap-2 border border-yellow-800 cursor-pointer hover:bg-zinc-800 transition-all duration-300 bg-zinc-900 rounded-md px-3 py-2 w-fit"
          >
            <AiOutlineTags className="text-white text-xl" />
            <p>Add Tags</p>
          </div>
        )}
        <TagsDialog
          isOpen={isTagsDialogOpen}
          setIsOpen={setIsTagsDialogOpen}
          tags={tags || []}
          allTags={allTags}
          gistId={gistId}
          description={description}
        />
      </section>
      <section className="px-5 mt-5 flex items-center gap-5">
        <div className="flex items-center gap-2 text-gray-400">
          <VscFiles />
          <p>
            {numberOfFiles} file{numberOfFiles > 1 ? 's' : ''}
          </p>
        </div>

        <div
          onClick={handleAutoTag}
          className="flex items-center gap-2 hover:bg-zinc-800 text-gray-300 hover:text-yellow-500 cursor-pointer py-1 px-3 transition-all duration-300 rounded-md"
        >
          <FaWandMagicSparkles
            className={`text-xl transition-all duration-100 ${
              isAutoTagging ? 'animate-spin' : ''
            }`}
          />
          <p>Auto Tag</p>
        </div>
      </section>
      {descriptionText && (
        <section className="px-5 mt-3 text-sm text-gray-400">
          <p>{truncateString(descriptionText)}</p>
        </section>
      )}
    </div>
  );
};

export default PreviewCard;
