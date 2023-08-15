'use client';

import { useState } from 'react';
import { AiOutlineDelete, AiOutlineFolderOpen } from 'react-icons/ai';
import { IoMdCreate } from 'react-icons/io';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  useDeleteCategory,
  useUpdateCategory,
} from '@/lib/hooks/useCategories';

import CreateCategoryDialog from './create-category-dialog';

type SearchProps = {
  categories: string[];
  category: string;
  description: string;
  gistId: string;
};

function CategoryCommand({
  categories,
  category,
  description,
  gistId,
}: SearchProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);

  const { updateCategory } = useUpdateCategory();

  const { deleteCategory, isLoading: isDeleting } = useDeleteCategory();

  const handleUpdateCategory = async (value: string) => {
    const categoryToUpdate = categories.find(
      (category) => category.toLowerCase() === value.toLowerCase()
    );
    await updateCategory({
      category: categoryToUpdate as string,
      description,
      gistId,
    });
    setOpen(false);
  };

  const handleDeleteCategory = async () => {
    await deleteCategory({
      category,
      description,
      gistId,
    });
    setOpen(false);
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={`border px-3 h-[2.5rem] ${
          category ? 'border-green-500' : 'border-slate-700 border-2'
        } rounded-lg flex items-center gap-2 cursor-pointer justify-center`}
      >
        <AiOutlineFolderOpen />
        <p className="text-sm flex items-center gap-3 text-muted-foreground">
          {category || 'Select a category'}
        </p>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={input}
          onValueChange={(value) => setInput(value)}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categories?.map((category) => (
              <CommandItem
                onSelect={handleUpdateCategory}
                value={category}
                key={category}
              >
                <span>{category}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
        <CommandList>
          <CommandGroup heading="Actions">
            <CommandItem
              className="flex items-center gap-3"
              onSelect={() => setIsCreateCategoryOpen(true)}
            >
              <IoMdCreate />
              <span>Create Category</span>
            </CommandItem>
            <CommandItem
              className={`flex items-center gap-3 ${
                !category ? 'opacity-30' : ''
              }`}
              disabled={isDeleting || !category}
              onSelect={handleDeleteCategory}
            >
              <AiOutlineDelete />
              <span>Delete Category</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <CreateCategoryDialog
        isOpen={isCreateCategoryOpen}
        setIsOpen={setIsCreateCategoryOpen}
        categories={categories}
        description={description}
        gistId={gistId}
        closeCommandDialog={() => setOpen(false)}
      />
    </>
  );
}

export default CategoryCommand;
