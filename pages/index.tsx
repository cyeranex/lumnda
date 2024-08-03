import TypingTest from '../components/TypingTest';
import { useState } from 'react';

const snippets = [
  {
    id: 1,
    title: "Add Two Numbers",
    code: `#include <stdio.h>\nint main() {\n    int a, b, sum;\n    printf("Enter two numbers: ");\n    scanf("%d %d", &a, &b);\n    sum = a + b;\n    printf("Sum: %d", sum);\n    return 0;\n}`,
    output: "Enter two numbers: 3 4\nSum: 7"
  },
  {
    id: 2,
    title: "Print Hello World",
    code: `#include <stdio.h>\nint main() {\n    printf("Hello, World!");\n    return 0;\n}`,
    output: "Hello, World!"
  }
];

const Home = () => {
  const [selectedSnippet, setSelectedSnippet] = useState(snippets[0]);

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-5">Select a Code Snippet</h1>
      <div className="mb-5">
        {snippets.map((snippet) => (
          <button
            key={snippet.id}
            className="mr-2 mb-2 px-4 py-2 bg-gray-200 rounded"
            onClick={() => setSelectedSnippet(snippet)}
          >
            {snippet.title}
          </button>
        ))}
      </div>
      <TypingTest snippet={selectedSnippet.code} expectedOutput={selectedSnippet.output} />
    </div>
  );
};

export default Home;
