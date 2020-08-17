import React from 'react';
import repo from './questions.js';

function Result(props) {
  function calcScore() {
    let score = 0;
    for (let i = 0; i < repo.length; i++) {
      if (props.quizData[i] !== '') {
        if (repo[i][props.quizData[i]].correct) {
          score++;
        }
      }
    }
    return score;
  }

  return (
    <div className="resultsContainer">
      <h1>Results</h1>
      <p>Your result is</p>
      <p className="score">
        {calcScore()}/{repo.length}
      </p>
      <p className="result">
        {calcScore() >= 0.8 * repo.length ? 'You Passed!' : 'You Failed.'}
      </p>
      <button className="tryAgain" onClick={props.handleIntro}>
        Try Again
      </button>
    </div>
  );
}

export default Result;
