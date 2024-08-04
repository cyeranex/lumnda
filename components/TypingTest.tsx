import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import SyntaxHighlighter with no SSR
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then(mod => mod.Light),
  { ssr: false }
);

const customStyle = {
  background: 'transparent !important',
  padding: '0px',
  fontFamily: 'monospace !important',
  fontSize: '1.3rem',
  fontWeight: 'bold',
  margin: '40px 15px',
};

const TypingTest = ({ snippet, expectedOutput }: { snippet: string, expectedOutput: string }) => {
  const [style, setStyle] = useState<{ [key: string]: React.CSSProperties } | null>(null);
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const text = snippet;

  function calculateTextareaDimensions(text: string) {
    const lines = text.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length));
    const rows = lines.length;
  
    return { cols: maxLineLength, rows };
  }
  
  useEffect(() => {
    // Dynamically import the style
    import('react-syntax-highlighter/dist/esm/styles/hljs').then(mod => {
      setStyle(mod.far);
    });
  }, []);

  

  useEffect(() => {
    const { cols, rows } = calculateTextareaDimensions(text);
    setCols(cols);
    setRows(rows);
  }, [text]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      } else if (e.ctrlKey && e.key === 'F9') {
        e.preventDefault();
        handleRun();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        tabSpace();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userInput]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setUserInput(value);
  };

  const handleSave = () => {
    // Implement actual save functionality here
    alert('Simulating Turbo C++ save dialog...');
  };

  const handleRun = () => {
    // Implement code compilation and execution here
    // For now, just setting output for simplicity
    setOutput(expectedOutput);

    // Basic error checking (replace with actual compiler output)
    if (userInput !== expectedOutput) {
      setError('Output does not match expected output');
    } else {
      setError('');
    }
  };

  const tabSpace = () => {
    if (textAreaRef.current) {
      const { selectionStart, selectionEnd, value } = textAreaRef.current;
      const tab = '  '; // Define the number of spaces for a tab

      // Insert the tab character at the cursor position
      setUserInput(
        value.substring(0, selectionStart) + tab + value.substring(selectionEnd)
      );

      // Update the cursor position to be after the inserted tab
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = selectionStart + tab.length;
    }
  };

  
  
const fontSizeRem = 1.3;
function calculateR(rows: number, fontSizeRem: number) {
  // Assuming root font size is 16px
  const rootFontSize = 16;
    const fontSizePx = fontSizeRem * rootFontSize;
    const lineHeight = fontSizePx * 1.3; 
    const totalHeight = rows * lineHeight;
  
    return totalHeight;
  }
function calculateC(cols: number, fontSizeRem: number) {
  // Assuming root font size is 16px
  const rootFontSize = 16;
    const fontSizePx = fontSizeRem * rootFontSize;
    const lineHeight = fontSizePx * 1.3; 
    const totalWidth = (cols * lineHeight)/2;
  
    return totalWidth;
  }
  
  const calHeight = calculateR(rows, fontSizeRem);
  const calWidth = `calc(30px + ${calculateC(cols, fontSizeRem)}px)`;

  if (!style) return (<div>Style Loading...</div>);

  return (
    <div className="rounded shadow-lg flex-none md:flex-1 relative border-red-300" style={{ width: calWidth, height: calHeight }}>
      <div className='typeArea h-auto'>

        {/* <div className="absolute top-0 left-0 w-auto h-auto z-0 p-2 whitespace-pre-wrap border-green-700" aria-hidden="true">
          <SyntaxHighlighter language="c" style={style} wrapLines={true} customStyle={{ ...customStyle, opacity: '0.5' }}>
            {snippet}
          </SyntaxHighlighter>
        </div>

        <div className="absolute top-0 left-0 w-auto h-auto z-10 p-2 whitespace-pre-wrap border-red-800">
          <SyntaxHighlighter language="c" style={style} wrapLines={true} customStyle={customStyle}>
            {userInput}
          </SyntaxHighlighter>
        </div> */}

        {/* Text area for user input */}
        <textarea
          ref={textAreaRef}
          className="textInput relative z-20 p-2 h-auto border-y-green-500"
          value={userInput}
          onChange={handleChange}
          cols={cols}
          rows={rows}
          style={{
            backgroundColor: 'transparent',
            color: 'transparent',
            outline: 'none',
            height: 'auto',
            width: 'auto',
            caretColor: 'yellow',
            fontFamily: 'monospace',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            margin: '40px 15px',
          }}
        />
      </div>
      <div className='w-full'>
        {/* Buttons for save and run */}
      <div className="mt-2 flex">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>Save (Ctrl+S)</button>
        <button className="ml-2 px-4 py-2 bg-green-500 text-white rounded" onClick={handleRun}>Run (Ctrl+F9)</button>
      </div>

      {/* Display output */}
      <pre className="mt-2 bg-gray-100 p-2 rounded">{output}</pre>
      {error && <div className="text-red-500">{error}</div>}
      </div>

      <div>
        <SyntaxHighlighter language="c" style={style} wrapLines={true} customStyle={customStyle} >
          {`
          #inlcude 
          void main() {
            Printf("Hllxscdsdeo");
          }
          `}
        </SyntaxHighlighter>
      </div>

    </div>
  );
};

export default TypingTest;
