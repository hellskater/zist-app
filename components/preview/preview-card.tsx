import { BsFileEarmarkText, BsFiletypeXml } from 'react-icons/bs';
import { VscJson } from 'react-icons/vsc';
import { SiYaml } from 'react-icons/si';
import { FaCode } from 'react-icons/fa';

import { useGetGistFile } from '@/lib/hooks/useGists';
import { Skeleton } from '@/components/ui/skeleton';
import { extensionToLanguage } from '@/lib/constants/language';
import { GistFileType } from '@/lib/types/gist';
import { getZistConfig } from '@/lib/hooks/utils';

import CodePreview from './code-preview';
import CategoryCommand from './category/category-command';

type PreviewCardProps = {
  data: GistFileType;
  description: string;
  categories: string[];
  gistId: string;
};

const PreviewCard = ({
  data,
  description,
  gistId,
  categories,
}: PreviewCardProps) => {
  const { data: gistContent } = useGetGistFile(data?.raw_url);

  const { category } = getZistConfig(description);

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

  return (
    <div className="w-full lg:w-[calc(50%-1.25rem)] h-80 border-2 rounded-2xl overflow-hidden">
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
    </div>
  );
};

export default PreviewCard;
