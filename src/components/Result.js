/*=====================================
Result is a child component of App. 
This component calculates and shows the user's scores.
=====================================*/

import React from 'react';
import repo from './questions.js';

function Result(props) {
  const passingPercent = 0.8;

  function calcScore() {
    let score = 0;
    for (let i = 0; i < repo.length; i++) {

      // Check if localStorage for index i has a value.
      if (localStorage.getItem(i.toString()) !== 'null') {
       if (repo[i][localStorage.getItem(i)].correct) {
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
        {calcScore() >= passingPercent * repo.length ? 'You Passed!' : 'You Failed.'}
      </p>
      <button className="tryAgain" onClick={props.handleIntro}>
        Try Again
      </button>
    </div>
  );
}

export default Result;
