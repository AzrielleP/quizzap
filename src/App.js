import React, { useState } from 'react';
import Intro from './Intro';
import Quiz from './Quiz';
import Result from './Result';


function App() {
  const [quiz, setQuiz] = useState(false);
  const [intro, setIntro] = useState(true);
  const [result, setResult] = useState(false);
  const [quizData, setQuizData] = useState([]);

  const handleStartQuiz = (event) => {
    event.preventDefault();
    setQuiz(previous => !previous);
    setIntro(previous => !previous);
  }

  const handleResult = () => {
    setQuiz(previous => !previous);
    setResult(previous => !previous);
  }

  const handleIntro = (event) => {
    event.preventDefault();
    setResult(previous => !previous);
    setIntro(previous => !previous);
    setQuizData([]);
  }

  const callback = (data) => {
    setQuizData(data);
  }

  return (
    <div>
      {intro && <Intro handleStartQuiz = {handleStartQuiz}/>}
      {quiz && <Quiz handleResult = {handleResult} parentCallback = {callback}/>}
      {result && <Result handleIntro = {handleIntro} quizData = {quizData}/>}
    </div>
  )
}

export default App;