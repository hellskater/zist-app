import { BsFileEarmarkText, BsFiletypeXml } from 'react-icons/bs';
import { VscFiles, VscJson } from 'react-icons/vsc';
import { SiYaml } from 'react-icons/si';
import { FaCode } from 'react-icons/fa';
import { useState } from 'react';
import { AiFillEdit, AiOutlineTags, AiTwotoneEdit } from 'react-icons/ai';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
import Link from 'next/link';
import { FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

import { useGetGistFile } from '@/lib/hooks/useGists';
import { Skeleton } from '@/components/ui/skeleton';
import { extensionToLanguage } from '@/lib/constants/language';
import { Files } from '@/lib/types/gist';
import { getDescription, getZistConfig } from '@/lib/hooks/utils';
import { truncateString } from '@/lib/utils';

import CodePreview from './code-preview';
import CategoryCommand from './category/category-command';
import TagsDialog from './tags/tags-dialog';

type PreviewCardProps = {
  files: Files;
  description: string;
  categories: string[];
  gistId: string;
  allTags: string[];
  isPublic?: boolean;
  updated_at: string;
};

const PreviewCard = ({
  files,
  description,
  gistId,
  categories,
  allTags,
  isPublic,
  updated_at,
}: PreviewCardProps) => {
  const data = files[Object.keys(files)[0]];
  const numberOfFiles = Object.keys(files).length;
  const { data: gistContent } = useGetGistFile(data?.raw_url);

  const router = useRouter();

  const [isTagsDialogOpen, setIsTagsDialogOpen] = useState(false);

  const { category, tags = [] } = getZistConfig(description);

  const descriptionText = getDescription(description);

  const extension = data?.filename?.split('.').pop();

  const language =
    extensionToLanguage[extension as string] || data?.language?.toLowerCase();

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

  return (
    <div
      onClick={() => {
        if (!isPublic) return;
        router.push(`/gist/${gistId}`);
      }}
      className={`w-full relative lg:w-[calc(50%-1.25rem)] 2xl:w-[30%] h-96 border-2 rounded-2xl overflow-hidden ${
        isPublic
          ? 'cursor-pointer hover:-translate-y-2 transition-all duration-200'
          : ''
      }`}
    >
      {!isPublic && (
        <Link href={`/gist/${gistId}`}>
          <FiEye className="absolute top-3 bg-black p-[0.4rem] rounded-md text-3xl right-3 text-white cursor-pointer hover:text-yellow-500 transition-all duration-300" />
        </Link>
      )}

      <div
        onClick={() => {
          if (!isPublic) return;
          router.push(`edit-zist/${gistId}`);
        }}
      >
        {!isPublic && (
          <Link href={`edit-zist/${gistId}`}>
            <AiTwotoneEdit className="absolute top-12 bg-black p-[0.4rem] rounded-md text-3xl right-3 text-white cursor-pointer hover:text-yellow-500 transition-all duration-300" />
          </Link>
        )}
      </div>

      <section>
        {gistContent ? (
          <CodePreview value={gistContent} language={language} />
        ) : (
          <Skeleton className="w-full h-40" />
        )}
      </section>
      <section className="p-5">
        <div className="flex items-center gap-5 justify-between">
          <p className="text-base">{data?.filename}</p>
          {getIcon()}
          <CategoryCommand
            isPublic={isPublic}
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
            {!isPublic && (
              <div onClick={() => setIsTagsDialogOpen(true)} title="Edit tags">
                <AiFillEdit className="text-white text-3xl cursor-pointer hover:bg-zinc-900 p-1 transition-all duration-300 rounded-md" />
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => {
              if (isPublic) return;
              setIsTagsDialogOpen(true);
            }}
            className={`flex text-sm items-center gap-2 border border-yellow-800 ${
              !isPublic && 'cursor-pointer hover:bg-zinc-800'
            } transition-all duration-300 bg-zinc-900 rounded-md px-3 py-2 w-fit`}
          >
            <AiOutlineTags className="text-white text-xl" />
            <p>{isPublic ? 'No tags' : 'Add tags'}</p>
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
      <section className="px-5 mt-5 flex items-center gap-3">
        <div className="flex items-center gap-2 text-gray-400">
          {numberOfFiles}
          <VscFiles />
          {/* <p>
            {numberOfFiles} file{numberOfFiles > 1 ? 's' : ''}
          </p> */}
          <p className="text-sm ml-2">Updated {dayjs(updated_at).fromNow()}</p>
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
