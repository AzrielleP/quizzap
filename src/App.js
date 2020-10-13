/*=====================================
App is the parent component. 
It has three states which are responsible on how the components will appear or hide based on its boolean values:
  - quiz will show / hide the Quiz component.
  - intro will show / hide the Intro component.
  - result will show / hide the Result component.
The other three states are responsible for setting data to be used in the quiz proper:
  - question will hold the fetched data from the API. This will be used in the Quiz and Result components.
  - category and difficulty will contain the user's preference. This will be used in the Intro and Quiz components.
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

  const handleResult = () => {
    setQuiz((previous) => !previous);
    setResult((previous) => !previous);
  };

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
          difficulty={difficulty}
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
