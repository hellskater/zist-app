import { Editor } from '@tiptap/core';
import { Check, ChevronDown } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

export interface BubbleColorMenuItem {
  name: string;
  color: string | null;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--background)',
  },
  {
    name: 'Purple',
    color: '#9333EA',
  },
  {
    name: 'Red',
    color: '#E00000',
  },
  {
    name: 'Yellow',
    color: '#EAB308',
  },
  {
    name: 'Blue',
    color: '#2563EB',
  },
  {
    name: 'Green',
    color: '#008A00',
  },
  {
    name: 'Orange',
    color: '#FFA500',
  },
  {
    name: 'Pink',
    color: '#BA4081',
  },
  {
    name: 'Gray',
    color: '#A8A29E',
  },
];

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--zist-highlight-default)',
  },
  {
    name: 'Purple',
    color: 'var(--zist-highlight-purple)',
  },
  {
    name: 'Red',
    color: 'var(--zist-highlight-red)',
  },
  {
    name: 'Yellow',
    color: 'var(--zist-highlight-yellow)',
  },
  {
    name: 'Blue',
    color: 'var(--zist-highlight-blue)',
  },
  {
    name: 'Green',
    color: 'var(--zist-highlight-green)',
  },
  {
    name: 'Orange',
    color: 'var(--zist-highlight-orange)',
  },
  {
    name: 'Pink',
    color: 'var(--zist-highlight-pink)',
  },
  {
    name: 'Gray',
    color: 'var(--zist-highlight-gray)',
  },
];

export const ColorSelector: FC<ColorSelectorProps> = ({
  editor,
  isOpen,
  setIsOpen,
}) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color })
  );

  return (
    <div className="relative h-full">
      <button
        className="flex h-full items-center gap-1 p-2 text-sm font-medium text-stone-200 hover:bg-stone-800 active:bg-stone-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="rounded-sm px-1"
          style={{
            color: activeColorItem?.color as string,
            backgroundColor: activeHighlightItem?.color as string,
          }}
        >
          A
        </span>

        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <section className="fixed top-full z-[99999] mt-1 flex w-48 flex-col overflow-hidden rounded border border-stone-700 bg-background p-1 shadow-xl animate-in fade-in slide-in-from-top-1">
          <div className="my-1 px-2 text-sm text-stone-400">Color</div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetColor();
                name !== 'Default' &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color as string)
                    .run();
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-200 hover:bg-stone-800"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border border-stone-700 px-1 py-px font-medium"
                  style={{ color: color as string }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('textStyle', { color }) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}

          <div className="mb-1 mt-2 px-2 text-sm text-stone-400">
            Background
          </div>

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                name !== 'Default' &&
                  editor.commands.setHighlight({ color: color as string });
                setIsOpen(false);
              }}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-200 hover:bg-stone-800"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border border-stone-700 px-1 py-px font-medium"
                  style={{ backgroundColor: color as string }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('highlight', { color }) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </section>
      )}
    </div>
  );
};
