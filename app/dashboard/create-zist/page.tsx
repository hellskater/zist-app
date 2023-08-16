'use client';

import { useState } from 'react';
import React from 'react';

import CreateCodeDialog from '@/components/editor/CreateCodeDialog';

const CreateZistPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(true);
  return (
    <div>
      <CreateCodeDialog
        isOpen={isCreateDialogOpen}
        handleCloseDialog={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
};

export default CreateZistPage;
