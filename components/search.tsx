import { Input } from '@/components/ui/input';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

const Search = ({ onChange, placeholder, value }: SearchProps) => {
  return (
    <div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
