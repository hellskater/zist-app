'use client';

import { useState } from 'react';
import React from 'react';

import Tiptap from '@/components/tiptap';
import CreateCodeDialog from '@/components/editor/CreateCodeDialog';

const CreateZistPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(true);
  return (
    <div>
      <Tiptap />
      <CreateCodeDialog
        isOpen={isCreateDialogOpen}
        handleCloseDialog={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
};

export default CreateZistPage;
