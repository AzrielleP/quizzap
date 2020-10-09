/*=====================================
App is the parent component. It sets three states which are responsible on how the components will appear or hide based on its boolean values:
  - quiz will show / hide the Quiz component.
  - intro will show / hide the Intro component.
  - result will show / hide the Result component.
These states are handed down as props for each component.
=====================================*/

import React, { useState } from 'react';
import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [quiz, setQuiz] = useState(false);
  const [intro, setIntro] = useState(true);
  const [result, setResult] = useState(false);
  const [question, setQuestion] = useState({ content: [], isLoaded: false });
  const [category, setCategory] = useState('9'); // Set General Knowledge as the default category.
  const [difficulty, setDifficulty] = useState('easy'); // Set Easy as the default difficulty.

  const handleQuizCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleQuizDifficulty = (event) => {
    setDifficulty(event.target.value);
  };

  const handleDataFetch = (fetchedData, boolean) => {
    setQuestion({
      content: fetchedData,
      isLoaded: boolean,
    });
  };

  // handleStartQuiz will show the Quiz component.
  const handleStartQuiz = () => {
    intro
      ? setIntro((previous) => !previous)
      : setResult((previous) => !previous);
    setQuiz((previous) => !previous);
    setQuestion({
      isLoaded: false,
    });

    // Clear localStorage just in case the website refreshes.
    localStorage.clear();
  };

  // handleResult will show the Result component.
  const handleResult = () => {
    setQuiz((previous) => !previous);
    setResult((previous) => !previous);
  };

  // handleIntro will show the Intro component.
  const handleIntro = () => {
    setResult((previous) => !previous);
    setIntro((previous) => !previous);
    // Clear localStorage when the user wants to try the quiz again.
    localStorage.clear();
  };

  return (
    <div>
      {intro && (
        <Intro
          handleStartQuiz={handleStartQuiz}
          handleQuizCategory={handleQuizCategory}
          handleQuizDifficulty={handleQuizDifficulty}
          category={category}
          difficulty={difficulty}
        />
      )}
      {quiz && (
        <Quiz
          handleResult={handleResult}
          handleDataFetch={handleDataFetch}
          question={question}
          category={category}
          difficulty = {difficulty}
        />
      )}
      {result && (
        <Result
          handleIntro={handleIntro}
          handleStartQuiz={handleStartQuiz}
          question={question}
        />
      )}
    </div>
  );
}

export default App;
