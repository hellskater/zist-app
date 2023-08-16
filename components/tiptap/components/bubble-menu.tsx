import { BubbleMenu, BubbleMenuProps, Editor } from '@tiptap/react';
import { FC, useState } from 'react';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import { NodeSelector } from './node-selector';
import { ColorSelector } from './color-selector';
import { LinkSelector } from './link-selector';

export interface BubbleMenuItem {
  name: string;
  isActive: () => boolean;
  command: () => void;
  icon: typeof BoldIcon;
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const EditorBubbleMenu: FC<EditorBubbleMenuProps> = (props) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => (props.editor as Editor).isActive('bold'),
      command: () =>
        (props.editor as Editor).chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => (props.editor as Editor).isActive('italic'),
      command: () =>
        (props.editor as Editor).chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: () => (props.editor as Editor).isActive('underline'),
      command: () =>
        (props.editor as Editor).chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: () => (props.editor as Editor).isActive('strike'),
      command: () =>
        (props.editor as Editor).chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: 'code',
      isActive: () => (props.editor as Editor).isActive('code'),
      command: () =>
        (props.editor as Editor).chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor }) => {
      // don't show if image is selected
      if (editor.isActive('image')) {
        return false;
      }
      return editor.view.state.selection.content().size > 0;
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
        setIsLinkSelectorOpen(false);
      },
    },
  };

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="flex w-fit divide-x divide-stone-500 rounded border border-stone-700 bg-background shadow-xl"
    >
      <NodeSelector
        editor={props.editor as Editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsLinkSelectorOpen(false);
        }}
      />
      <LinkSelector
        editor={props.editor as Editor}
        isOpen={isLinkSelectorOpen}
        setIsOpen={() => {
          setIsLinkSelectorOpen(!isLinkSelectorOpen);
          setIsColorSelectorOpen(false);
          setIsNodeSelectorOpen(false);
        }}
      />
      <div className="flex">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.command}
            className="p-2 text-stone-200 hover:bg-stone-800 active:bg-stone-800"
          >
            <item.icon
              className={cn('h-4 w-4', {
                'text-blue-500': item.isActive(),
              })}
            />
          </button>
        ))}
      </div>
      <ColorSelector
        editor={props.editor as Editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen);
          setIsNodeSelectorOpen(false);
          setIsLinkSelectorOpen(false);
        }}
      />
    </BubbleMenu>
  );
};
