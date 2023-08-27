import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUpdateTags } from '@/lib/hooks/useTags';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  allTags: string[];
  tags: string[];
  description: string;
  gistId: string;
};

function TagsDialog({
  isOpen,
  setIsOpen,
  allTags,
  tags,
  description,
  gistId,
}: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const { updateTags, isPending: isTagsUpdating } = useUpdateTags();

  const handleUpdateTags = async () => {
    await updateTags({
      gistId,
      description,
      tags: selectedTags,
    });
    toast.success('Tags updated');
    setSelectedTags([]);
    setInput('');
    setIsOpen(false);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      if (selectedTags.length >= 3) {
        toast.error('Only three tags allowed');
        return;
      }
      setSelectedTags((prevTags) => Array.from(new Set([...prevTags, input])));
      setInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };

  useEffect(() => {
    setSelectedTags(tags || []);
  }, [tags]);

  const existingTags =
    allTags?.filter((tag) => !selectedTags.includes(tag)) || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Tags</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center text-sm bg-gray-200 text-black rounded px-2 py-1"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-sm font-semibold"
              >
                X
              </button>
            </div>
          ))}
          <Input
            id="name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Type and press enter to add tag"
          />
          {existingTags?.length > 0 && (
            <div className="mt-5">
              <p>Select from existing</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {existingTags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() =>
                      setSelectedTags((prevTags) => [...prevTags, tag])
                    }
                    className={`bg-zinc-900 cursor-pointer hover:bg-zinc-800 transition-all duration-300 text-white px-3 py-1 rounded-md text-sm`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={handleUpdateTags}
            disabled={isTagsUpdating}
            type="submit"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TagsDialog;
