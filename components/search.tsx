'use client';

import { useEffect, useRef } from 'react';

type SearchProps = {
  searchInput: string;
  setSearchInput: (input: string) => void;
};

function Search({ searchInput, setSearchInput }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div className="border px-4 h-[3rem] rounded-lg flex flex-col cursor-pointer justify-center">
        <p className="text-lg flex items-center gap-3 text-muted-foreground">
          <input
            ref={inputRef}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="w-full bg-transparent outline-none border-none text-white"
            placeholder="Search"
          />
          <kbd className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 py-2 font-mono text-base font-medium text-muted-foreground opacity-100">
            <span className="text-base">⌘</span>J
          </kbd>
        </p>
      </div>
    </>
  );
}

export default Search;
