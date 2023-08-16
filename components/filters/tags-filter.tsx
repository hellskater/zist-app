type Props = {
  allTags: string[];
  selectedTags: string[] | undefined;
  setSelectedTags: (tags: string[]) => void;
};

const TagsFilter = ({ allTags, setSelectedTags, selectedTags }: Props) => {
  const handleTagChange = (tag: string) => {
    if (selectedTags?.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...(selectedTags || []), tag]);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {allTags.map((tag) => {
        const isSelected = selectedTags?.includes(tag);

        return (
          <span
            className={`px-2 py-1 text-base cursor-pointer rounded-lg ${
              isSelected ? 'bg-white text-black' : 'bg-zinc-800 text-white'
            }`}
            key={tag}
            onClick={() => handleTagChange(tag)}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
};

export default TagsFilter;
