import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sorts } from '@/lib/types/zist';

type Props = {
  selectedSort: Sorts;
  setSelectedSort: (value: Sorts) => void;
};

function SortDropdown({ selectedSort, setSelectedSort }: Props) {
  return (
    <Select
      defaultValue={selectedSort || 'updated'}
      onValueChange={(value) => setSelectedSort(value as Sorts)}
      value={selectedSort || 'updated'}
    >
      <SelectTrigger className="w-[180px] h-10 capitalize">
        <SelectValue placeholder="Select a sort option" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="updated">Updated</SelectItem>
          <SelectItem value="created">Created</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortDropdown;
