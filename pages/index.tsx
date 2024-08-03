import React, { useState } from 'react';
import TypingTest from '../components/TypingTest';
// import snippets from '../snippets';

const snippets = [
  {
    id: 1,
    title: "Add Two Numbers",
    code: `#include <stdio.h>\nint main() {\n  int a, b, sum;\n  printf("Enter two numbers: ");\n  scanf("%d %d", &a, &b);\n  sum = a + b;\n  printf("Sum: %d", sum);\n  return 0;\n}`,
    output: "Enter two numbers: 3 4\nSum: 7",
    level: "Easy"
  },
  {
    id: 2,
    title: "Print Hello World",
    code: `#include <stdio.h>\nint main() {\n  printf("Hello, World!");\n  return 0;\n}`,
    output: "Hello, World!",
    level: "Easy"
  },
  {
    id: 3,
    title: "Check Even or Odd",
    code: `#include <stdio.h>\nint main() {\n  int num;\n  printf("Enter a number: ");\n  scanf("%d", &num);\n  if (num % 2 == 0) {\n    printf("%d is even", num);\n  } else {\n    printf("%d is odd", num);\n  }\n  return 0;\n}`,
    output: "Enter a number: 5\n5 is odd",
    level: "Medium"
  },
  {
    id: 4,
    title: "Factorial of a Number",
    code: `#include <stdio.h>\nint main() {\n  int n, i, factorial = 1;\n  printf("Enter a number: ");\n  scanf("%d", &n);\n  for (i = 1; i <= n; ++i) {\n    factorial *= i;\n  }\n  printf("Factorial of %d = %d", n, factorial);\n  return 0;\n}`,
    output: "Enter a number: 5\nFactorial of 5 = 120",
    level: "Medium"
  },
  {
    id: 5,
    title: "Fibonacci Series",
    code: `#include <stdio.h>\nint main() {\n  int n, t1 = 0, t2 = 1, nextTerm;\n  printf("Enter the number of terms: ");\n  scanf("%d", &n);\n  printf(\"Fibonacci Series: \");\n  for (int i = 1; i <= n; ++i) {\n    printf("%d ", t1);\n    nextTerm = t1 + t2;\n    t1 = t2;\n    t2 = nextTerm;\n  }\n  return 0;\n}`,
    output: "Enter the number of terms: 10\nFibonacci Series: 0 1 1 2 3 5 8 13 21 34",
    level: "Hard"
  }
]




const Home = () => {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedSnippetIndex, setSelectedSnippetIndex] = useState(0);


  const handleLevelChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedLevel(event.target.value);
  };

  const handleSnippetChange = (event: { target: { value: string; }; }) => {
    setSelectedSnippetIndex(parseInt(event.target.value));
  };

  const filteredSnippets = selectedLevel === "All"
    ? snippets
    : snippets.filter(snippet => snippet.level === selectedLevel);

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-5">Select the Code to Practice</h1>
      <select value={selectedLevel} onChange={handleLevelChange}>
        <option value="All">All</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <br />
      <select value={selectedSnippetIndex} onChange={handleSnippetChange}>
        {filteredSnippets.map((snippet, index) => (
          <option key={index} value={index}>{index + 1}. {snippet.title}</option>
        ))}
      </select>
      <TypingTest snippet={filteredSnippets[selectedSnippetIndex].code} expectedOutput={filteredSnippets[selectedSnippetIndex].output} />
    </div>
  );
};

export default Home;
