import { useGetGist } from '@/lib/hooks/useGists';
import { Skeleton } from '@/components/ui/skeleton';
import { extensionToLanguage } from '@/lib/constants/language';

import CodePreview from './code-preview';

export type GistFileData = {
  filename: string;
  language: string;
  raw_url: string;
  size: number;
  type: string;
};

type PreviewCardProps = {
  data: GistFileData;
};

const PreviewCard = ({ data }: PreviewCardProps) => {
  const { data: gistContent } = useGetGist(data?.raw_url);

  const language = data?.language.toLowerCase();

  const extension = data?.filename.split('.').pop();

  const languageIcon = extensionToLanguage[extension as string];

  console.log(languageIcon);

  return (
    <div className="w-full lg:w-[calc(50%-2.5rem)] h-80 border-2 rounded-2xl overflow-hidden">
      <section>
        {gistContent ? (
          <CodePreview value={gistContent} language={language} />
        ) : (
          <Skeleton className="w-full h-40" />
        )}
      </section>
      <section className="p-5">
        <div className="flex items-center gap-10">
          <p className="text-xl">{data?.filename}</p>
          {languageIcon && (
            <i
              className={`devicon-${languageIcon}-original text-white text-3xl`}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default PreviewCard;
