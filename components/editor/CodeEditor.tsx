import React from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
interface CodeEditorProps {
  language: string;
  theme: string;
  options: Object;
  value: string;
  handleOnChange: OnChange;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  theme,
  options,
  value,
  handleOnChange,
}) => {
  return (
    <Editor
      options={options}
      language={language}
      value={value}
      theme={theme}
      height="310px"
      defaultLanguage="javascript"
      defaultValue="\n // Hello Zist"
      onChange={handleOnChange}
      className="bg-var(--background) border-gray-800"
    />
  );
};

export default CodeEditor;
