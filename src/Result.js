import React from 'react';

function Result(props) {
  return (
    <div class="resultsContainer">
      <h1>Results</h1>
      <p>Your result is</p>
      <p class="score">9/10</p>
      <p class="result">You Passed!</p>
      <button class="tryAgain" onClick = {props.handleIntro}>Try Again</button>
    </div>
  );
}

export default Result;
