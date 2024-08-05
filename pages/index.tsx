import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import TypingTest from '@/components/TypingTest';
import snippets from '@/snippets';

const Home = () => {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedSnippetIndex, setSelectedSnippetIndex] = useState(0);

  const handleLevelChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(event.target.value);
  };

  const handleSnippetChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSnippetIndex(parseInt(event.target.value));
  };

  const filteredSnippets = selectedLevel === "All"
    ? snippets
    : snippets.filter(snippet => snippet.level === selectedLevel);

  const selectedSnippet = filteredSnippets[selectedSnippetIndex] || {}; // Handle potential out of bounds

  return (
    <div className="p-0 md:p-5 m-0 ">
      <div className='m-5'>
        <h1 className="text-2xl mb-5 text-white">Select the Code to Practice</h1>
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
      {selectedSnippet.code ? (
        <TypingTest snippet={selectedSnippet.code} expectedOutput={selectedSnippet.output} />
      ) : (
        <p>Please select a snippet to practice.</p>
      )}
      </div>
    </div>
  );
};

export default Home;
