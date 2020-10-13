/*=====================================
Result is a child component of App. 
This component calculates and shows the user's scores as well as the questions he got right / wrong.
=====================================*/

import React, { useState, useEffect } from 'react';
import ResultPassed from './SVG/Result-Passed';
import ResultFailed from './SVG/Result-Failed';
import './css/Result.css';

function Result(props) {
  const { handleIntro, handleStartQuiz, question } = props;
  const [score, setScore] = useState(0);
  const [isFail, setFail] = useState(true);

  useEffect(() => {
    const passingPercent = 0.7;

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

    setScore(calcScore());
    if (score >= passingPercent * question.content.length) {
      setFail(false);
    }
  }, [question, score]);

  return (
    <div className="resultsContainer">
      <div className="scoreContainer">
        <p>Your score is</p>
        <p className="score">
          {score}/{question.content.length}
        </p>
        <div className="svgContainer">
          {isFail ? <ResultFailed /> : <ResultPassed />}
        </div>
        <p className="result">{isFail ? 'You Failed.' : 'You Passed!'}</p>
        <div className="resultButtonContainer">
          <button className="tryAgain" onClick={handleStartQuiz}>
            Try Again
          </button>
          <button className="backToMenu" onClick={handleIntro}>
            Back to Menu
          </button>
        </div>
      </div>
      <div className="reviewContainer">
        <p className="title">Your Quiz Review</p>
        <ul className="quizReview">
          {question.content.map((item, index) => {
            return (
              <li className="itemContainer" key={index}>
                <div className="checkContainer">
                  {localStorage.getItem(index) !== item.correct_answer ? (
                    <i className="far fa-times-circle"></i>
                  ) : (
                    <i className="far fa-check-circle"></i>
                  )}
                </div>
                <div className="item">
                  <p className="itemQuestion">
                    {item.question}
                    <span className="answer">
                      {localStorage.getItem(index) !== 'null'
                        ? localStorage.getItem(index)
                        : "You don't have an answer."}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Result;
