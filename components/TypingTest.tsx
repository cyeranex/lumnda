import { useState, useEffect, useRef } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { far } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const customStyle = {
    background: 'transparent !important', // Use !important to override any other styles
};

const TypingTest = ({ snippet, expectedOutput }: { snippet: string, expectedOutput: string }) => {
  const [userInput, setUserInput] = useState('');
  const [output, setOutput] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
    alert('Simulating Turbo C++ save dialog...');
  };

  const handleRun = () => {
    setOutput(expectedOutput);
  };

  const tabSpace = () => {
    if (textAreaRef.current) {
      const { selectionStart, selectionEnd, value } = textAreaRef.current;
      const tab = '    '; // Define the number of spaces for a tab

      // Insert the tab character at the cursor position
      setUserInput(
        value.substring(0, selectionStart) + tab + value.substring(selectionEnd)
      );

      // Update the cursor position to be after the inserted tab
      textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = selectionStart + tab.length;
    }
  };

  return (
    <div className="bg-turboBg text-turboText rounded shadow-lg" style={{ position: 'relative', height: '400px', width: '400px',border:'2px solid black' }}>
      {/* Highlighted snippet */}
      <div className="absolute top-0 left-0 w-full h-full z-0 p-2 whitespace-pre-wrap overflow-hidden" aria-hidden="true">
        <SyntaxHighlighter language="c" style={far} wrapLines={true} customStyle={{...customStyle,opacity:'0.3'}}>
          {snippet}
        </SyntaxHighlighter>
      </div>

      {/* User input with syntax highlighting */}
      <div className="absolute top-0 left-0 w-full h-full z-10 p-2 whitespace-pre-wrap overflow-hidden">
        <SyntaxHighlighter language="c" style={far} wrapLines={true} customStyle={customStyle}>
          {userInput}
        </SyntaxHighlighter>
      </div>

      {/* Text area for user input */}
      <textarea
        ref={textAreaRef}
        className="relative z-20  caret-white"
        value={userInput}
        onChange={handleChange}
        style={{
          backgroundColor: 'transparent',
          color: 'transparent',
          border: '2px solid orange ',
          outline: 'none',
          resize: 'none',
          height: '100%',
          margin: '0',
          padding: '0',
          top: '0',
          left:'0',
          width: '100%',
          minHeight: '100%'
        }}
      />
      
      {/* Buttons for save and run */}
      <div className="mt-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>Save (Ctrl+S)</button>
        <button className="ml-2 px-4 py-2 bg-green-500 text-white rounded" onClick={handleRun}>Run (Ctrl+F9)</button>
      </div>

      {/* Display output */}
      <pre className="mt-2 bg-gray-100 p-2 rounded">{output}</pre>
    </div>
  );
};

export default TypingTest;
