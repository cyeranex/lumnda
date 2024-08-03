import React, { useState } from 'react';
import TypingTest from '../components/TypingTest';
import snippets from '../snippets';


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
