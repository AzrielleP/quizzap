import React, { useState } from 'react';
import Intro from './Intro';
import Quiz from './Quiz';
import Result from './Result';


function App() {
  const [quiz, setQuiz] = useState(false);
  const [intro, setIntro] = useState(true);
  const [result, setResult] = useState(false);

  const handleStartQuiz = (event) => {
    event.preventDefault();
    setQuiz(previous => !previous);
    setIntro(previous => !previous);
  }

  const handleResult = (event) => {
    event.preventDefault();
    setQuiz(previous => !previous);
    setResult(previous => !previous);
  }

  const handleIntro = (event) => {
    event.preventDefault();
    setResult(previous => !previous);
    setIntro(previous => !previous);
  }

  return (
    <div>
      {intro && <Intro handleStartQuiz = {handleStartQuiz}/>}
      {quiz && <Quiz handleResult = {handleResult}/>}
      {result && <Result handleResult = {handleIntro}/>}
    </div>
  )
}

export default App;