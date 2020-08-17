/*=====================================
Intro is a child component of App. 
This component contains the instructions and the start button of the quiz.
=====================================*/

import React from 'react';

function Intro(props) {
  return (
    <div>
      <h1>Instructions</h1>
      <p>
        Choose the best answer from the choices. To pass, you must get a score
        of at least 80%.
      </p>
      <p>
        You can always go back to the previous questions to review your answers.
        When you are done, click <strong>Submit</strong>.
      </p>

      <button className="next" onClick={props.handleStartQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default Intro;
