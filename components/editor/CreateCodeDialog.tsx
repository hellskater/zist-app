import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

import CodeEditor from './CodeEditor';

type Props = {
  isOpen: boolean;
  handleCloseDialog: (isOpen: boolean) => void;
};

const config = { minmap: undefined };

function CreateCodeDialog({ isOpen }: Props) {
  const [code, setCode] = useState('');

  const handleOnChange = (newValue: string | undefined) => {
    if (newValue !== undefined) {
      setCode(newValue);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="p-2 border border-input">
        <DialogHeader>
          <DialogTitle>Create Zist</DialogTitle>
        </DialogHeader>
        <Input type="text" placeholder="Zist name" />
        <div className="grid gap-4 py-4">
          <CodeEditor
            language="javascript"
            theme="vs-dark"
            options={config}
            value={code}
            handleOnChange={handleOnChange}
          />
        </div>
        <DialogFooter>
          <Button>Cancel</Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CreateCodeDialog;
