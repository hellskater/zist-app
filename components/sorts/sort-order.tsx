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
  selectedSortOrder: SortOrder;
  setSelectedSortOrder: (value: SortOrder) => void;
};

function SortOrderDropdown({ selectedSortOrder, setSelectedSortOrder }: Props) {
  return (
    <Select
      defaultValue={selectedSortOrder || 'desc'}
      onValueChange={(value) => setSelectedSortOrder(value as SortOrder)}
      value={selectedSortOrder || 'desc'}
    >
      <SelectTrigger className="w-[180px] h-10 capitalize">
        <SelectValue placeholder="Select an order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortOrderDropdown;
