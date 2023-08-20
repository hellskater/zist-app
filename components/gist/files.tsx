import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SortOrder } from '@/lib/types/zist';

type Props = {
  files: string[] | undefined;
  selectedFile: string | undefined;
  setSelectedFile: (value: SortOrder) => void;
};

function Files({ selectedFile, setSelectedFile, files }: Props) {
  return (
    <Select
      defaultValue={selectedFile}
      onValueChange={(value) => setSelectedFile(value as SortOrder)}
      value={selectedFile}
    >
      <SelectTrigger className="w-[180px] h-10 capitalize">
        <SelectValue placeholder="Select an order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {files?.map((file: string) => {
            return (
              <SelectItem key={file} value={file}>
                {file}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Files;
