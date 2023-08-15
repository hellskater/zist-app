'use client';

import { useEffect, useState } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { GistFileType } from '@/lib/types/gist';

type SearchProps = {
  gists: GistFileType[];
};

function Search({ gists }: SearchProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="border px-4 h-[3rem] rounded-lg flex flex-col cursor-pointer justify-center"
      >
        <p className="text-lg flex items-center gap-3 text-muted-foreground">
          <span>Search</span>
          <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 py-2 font-mono text-base font-medium text-muted-foreground opacity-100">
            <span className="text-base">⌘</span>J
          </kbd>
        </p>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {gists?.map((gist) => (
              <CommandItem key={gist.filename}>
                <span>{gist.filename}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default Search;
