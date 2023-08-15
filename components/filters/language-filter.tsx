import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  allLanguages: string[];
  selectedLanguage: string | undefined;
  setSelectedLanguage: (category: string) => void;
};

function LanguageFilter({
  allLanguages,
  selectedLanguage,
  setSelectedLanguage,
}: Props) {
  return (
    <Select
      defaultValue={selectedLanguage}
      onValueChange={(value) => setSelectedLanguage(value)}
      value={selectedLanguage}
    >
      <SelectTrigger className="w-[180px] h-10">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={''}>All</SelectItem>
          {allLanguages.map((language) => (
            <SelectItem className="capitalize" key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default LanguageFilter;
