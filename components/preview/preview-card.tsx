import { useGetGist } from '@/lib/hooks/useGists';

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
  console.log(gistContent);
  return (
    <div>
      <section>
        {gistContent ? (
          <CodePreview value={gistContent} language={data.language} />
        ) : (
          <div>Loading...</div>
        )}
      </section>
      <p>{data.filename}</p>
    </div>
  );
};

export default PreviewCard;
