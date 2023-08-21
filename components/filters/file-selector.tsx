import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GistData } from '@/lib/types/gist';

type Props = {
  gistData: GistData;
  selectedFileId: string | null;
  onChange: (category: string) => void;
};

function FileSelector({ gistData, selectedFileId, onChange }: Props) {
  return (
    <Select
      defaultValue={selectedFileId || ''}
      onValueChange={(value) => onChange(value)}
      value={selectedFileId || ''}
    >
      <SelectTrigger className="w-[180px] h-10 text-normal-case">
        <SelectValue placeholder="Select a file" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {gistData.files.map((file) => (
            <SelectItem
              className="text-normal-case"
              key={file.id}
              value={file.id}
            >
              {file.filename}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FileSelector;
