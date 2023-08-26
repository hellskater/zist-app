type Props = {
  value: string;
};

const CodePreview = ({ value }: Props) => {
  const getValue = () => {
    if (typeof value === 'string') {
      // only include the first 1000 characters
      return value;
    } else {
      return JSON.stringify(value, null, 2);
    }
  };

  return (
    <pre
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <code
        style={{
          overflow: 'hidden',
          height: '100%',
          width: '100%',
          fontSize: '3rem',
          backgroundColor: 'black',
          color: 'white',
          padding: '3rem',
          paddingTop: '5rem',
          fontFamily: 'monospace',
        }}
      >
        {getValue()}
      </code>
    </pre>
  );
};

export default CodePreview;
