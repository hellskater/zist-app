import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  allCategories: string[];
  selectedCategory: string | undefined;
  setSelectedCategory: (category: string) => void;
};

function CategoryFilter({
  allCategories,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  return (
    <Select
      defaultValue={selectedCategory}
      onValueChange={(value) => setSelectedCategory(value)}
      value={selectedCategory}
    >
      <SelectTrigger className="w-[180px] h-10 capitalize">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={''}>All</SelectItem>
          {allCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CategoryFilter;
