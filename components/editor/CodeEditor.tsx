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
  // const handleEditorDidMount = (editor: Monaco, monaco: any) => {
  //   // Use the editor and monaco objects here if needed
  // };

  return (
    <Editor
      className="bg-background"
      height="400px"
      language={language}
      value={value}
      theme={theme}
      options={options}
      onChange={handleOnChange}
      //   onMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
