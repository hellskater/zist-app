import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  allFiles: string[];
  selectedFile: string | undefined;
  setCurrentFile: (category: string) => void;
};

function FileSelector({ allFiles, selectedFile, setCurrentFile }: Props) {
  return (
    <Select
      defaultValue={selectedFile}
      onValueChange={(value) => setCurrentFile(value)}
      value={selectedFile}
    >
      <SelectTrigger className="w-[180px] h-10 capitalize">
        <SelectValue placeholder="Select a file" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {allFiles.map((file) => (
            <SelectItem key={file} value={file}>
              {file}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FileSelector;
