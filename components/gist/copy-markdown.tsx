'use client';

import { MdOutlineContentCopy } from 'react-icons/md';
import { BsMarkdown } from 'react-icons/bs';
import { AiOutlineFileText } from 'react-icons/ai';
import useClipboard from 'react-use-clipboard';
import { FaCheck } from 'react-icons/fa';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  content: string | undefined;
  markdown: string | undefined;
};

function CopyMarkdown({ content, markdown }: Props) {
  const [isContentCopied, setContentCopied] = useClipboard(content as string, {
    successDuration: 2000,
  });
  const [isMarkdownCopied, setMarkdownCopied] = useClipboard(
    markdown as string,
    {
      successDuration: 2000,
    }
  );

  const isCopied = isContentCopied || isMarkdownCopied;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 text-base text-white cursor-pointer bg-black hover:bg-stone-900 px-2 py-1 rounded-md border border-stone-500">
          {isCopied ? (
            <FaCheck className="animate-bounce text-xl" />
          ) : (
            <MdOutlineContentCopy className="text-lg" />
          )}
          <p>Copy</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-ml-20">
        <DropdownMenuItem
          onClick={setMarkdownCopied}
          className="cursor-pointer flex items-center gap-2"
        >
          <BsMarkdown className="text-lg" />
          <p>Copy Markdown</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={setContentCopied}
          className="cursor-pointer flex items-center gap-2"
        >
          <AiOutlineFileText className="text-lg" />
          <p>Copy Content</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CopyMarkdown;
