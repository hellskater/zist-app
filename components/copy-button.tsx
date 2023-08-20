import useClipboard from 'react-use-clipboard';
import { MdOutlineContentCopy } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

type Props = {
  value: string;
};

const CopyButton = ({ value }: Props) => {
  const [isCopied, setCopied] = useClipboard(value, {
    successDuration: 2000,
  });
  return (
    <div className="p-2 rounded-md bg-black border-stone-500 hover:bg-stone-900 cursor-pointer text-white text-xl">
      {isCopied ? (
        <FaCheck className="animate-bounce text-green-500 text-xl" />
      ) : (
        <MdOutlineContentCopy onClick={setCopied} />
      )}
    </div>
  );
};

export default CopyButton;
