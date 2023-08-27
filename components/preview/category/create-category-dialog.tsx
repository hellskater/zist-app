import { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { useCreateCategory } from '@/lib/hooks/useCategories';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  categories: string[];
  description: string;
  gistId: string;
  closeCommandDialog: () => void;
};

function CreateCategoryDialog({
  isOpen,
  setIsOpen,
  categories,
  description,
  gistId,
  closeCommandDialog,
}: Props) {
  const [input, setInput] = useState('');

  const { createCategory, isPending: isCategoryCreating } = useCreateCategory();

  const handleCreateCategory = async () => {
    if (!input) {
      toast.error('Category name cannot be empty');
      return;
    }

    if (categories?.includes(input)) {
      toast.error('Category already exists');
      return;
    }

    if (input.length > 20) {
      toast.error('Category name too long');
      return;
    }

    await createCategory({
      category: input,
      description,
      gistId,
    });

    toast.success('Category created successfully!');

    setIsOpen(false);
    closeCommandDialog();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleCreateCategory}
            disabled={isCategoryCreating}
            type="submit"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryDialog;
