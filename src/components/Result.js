/*=====================================
Result is a child component of App. 
This component calculates and shows the user's scores.
=====================================*/

import React from 'react';

function Result(props) {
  const { handleIntro, handleStartQuiz, question } = props;
  const passingPercent = 0.8;

  function calcScore() {
    let score = 0;
    for (let i = 0; i < question.content.length; i++) {
      // Check if localStorage for index i has a value.
      if (localStorage.getItem(i.toString()) !== 'null') {
        if (localStorage.getItem(i) === question.content[i].correct_answer) {
          score++;
        }
      }
    }
    return score;
  }

  return (
    <div className="resultsContainer">
      <p>Your score is</p>
      <p className="score">
        {calcScore()}/{question.content.length}
      </p>
      <p className="result">
        {calcScore() >= passingPercent * question.content.length
          ? 'You Passed!'
          : 'You Failed.'}
      </p>
      <div className="resultButtonContainer">
        <button className="tryAgain" onClick={handleStartQuiz}>
          Try Again
        </button>
        <button className="backToMenu" onClick={handleIntro}>
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default Result;
