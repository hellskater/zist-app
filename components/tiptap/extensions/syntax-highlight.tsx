import { ReactNodeViewRenderer } from '@tiptap/react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { lowlight } from 'lowlight';
import 'highlight.js/styles/base16/seti-ui.css';

const SyntaxHighlight = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockComponent);
  },
}).configure({ lowlight });

export default SyntaxHighlight;

// ------------------------------------------------------------ //

type CodeBlockProps = {
  node: {
    attrs: {
      language: string;
    };
  };
  updateAttributes: (attrs: { language: string }) => void;
  extension: {
    options: {
      lowlight: {
        listLanguages: () => string[];
      };
    };
  };
};

export const CodeBlockComponent = ({}: CodeBlockProps) => (
  <NodeViewWrapper className="relative">
    <pre className="bg-stone-900 rounded-lg p-5 text-base">
      <NodeViewContent as="code" />
    </pre>
  </NodeViewWrapper>
);
