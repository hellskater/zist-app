'use client';

import { useState } from 'react';
import React from 'react';

import CreateCodeContainer from '@/components/editor/CreateCodeContainer';

// import Tiptap from '@/components/tiptap';

const CreateZistPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(true);

  return (
    <div>
      {/* <Tiptap /> */}
      <CreateCodeContainer
        isOpen={isCreateDialogOpen}
        handleCloseDialog={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
};

export default CreateZistPage;
