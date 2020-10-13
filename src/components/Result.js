/*=====================================
Result is a child component of App. 
This component calculates and shows the user's scores.
=====================================*/

import React from 'react';
import ResultPassed from './SVG/Result-Passed';
import ResultFailed from './SVG/Result-Failed';

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
    <div className = "resultsContainer">
      <div className="scoreContainer">
        <p>Your score is</p>
        <p className="score">
          {calcScore()}/{question.content.length}
        </p>
        <div className = "svgContainer">
        {calcScore() >= passingPercent * question.content.length
            ? <ResultPassed />
            : <ResultFailed />}
        </div>
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
      <div className = "reviewContainer">
          <p>Your Quiz Review</p>
          <ul className = "quizReview">
            {question.content.map((item, index) => {
                return <li className = "itemContainer" key = {index}>
                  <div className = "checkContainer">
                    <i className ="fas fa-check"></i>
                  </div>
                  <div className = "item">
                    <p className = "itemQuestion">{item.question}</p>
                    <p className = "userAnswer">
                      Your Answer: 
                      <span className = "answer">
                      {localStorage.getItem(index) !== "null" ? localStorage.getItem(index) : "You don't have an answer." }
                      </span>
                    </p>
                  </div>
                </li>

              })}
          </ul>
           
      </div>
    </div>
  );
}

export default Result;
