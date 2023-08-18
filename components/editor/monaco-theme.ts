// monaco-theme.ts
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

monaco.editor.defineTheme('myTheme', {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'editor.foreground': '#000000',
    'editor.background': '#EDF9FA',
    'editorCursor.foreground': '#8B0000',
    'editor.lineHighlightBackground': '#0000FF20',
    'editorLineNumber.foreground': '#008800',
    'editor.selectionBackground': '#88000030',
    'editor.inactiveSelectionBackground': '#88000015',
  },
});

export default monaco;
