/*=====================================
Quiz is a child component of App and contains the quiz proper.
It imports all the questions from questions.js.
=====================================*/

import React, { useState } from 'react';
import repo from './questions.js';

function Quiz(props) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [question, setQuestion] = useState(repo[questionNumber]);
  const [choice, setChoice] = useState('');

  function handleChoice(event) {
    setChoice(event.target.value);
  }

  function handleNextClick(event) {
    event.preventDefault();
    // Generate the next question and questionNumber.
    setQuestionNumber((previous) => previous + 1);
    setQuestion(repo[questionNumber + 1]);

    // Save the user's choice to the localStorage for the current questionNumber.
    localStorage.setItem(questionNumber, choice);

    // If the user hasn't picked a choice for the next question, set choice to '', otherwise, load what he has chosen.
    if (localStorage.getItem(questionNumber) === null) {
      setChoice('');
    } else {
      const answer = localStorage.getItem(questionNumber + 1);
      setChoice(answer);
    }
  }

  function handlePrevClick(event) {
    event.preventDefault();
    // Generate the previous question and questionNumber.
    setQuestionNumber((previous) => previous - 1);
    setQuestion(repo[questionNumber - 1]);

    // Get the user's previous answer and set that as the choice.
    const answer = localStorage.getItem(questionNumber - 1);
    setChoice(answer);
  }

  // When the user submits, get his answer from the last question and show the Results component.
  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem(questionNumber, choice);
    props.handleResult();
  }

  return (
    <form>
      <h1>Question #{questionNumber + 1}</h1>
      <p>{question.question}</p>
      <ul className="choicesContainer">
        <li>
          <input
            type="radio"
            name="choice"
            value="a"
            checked={choice === 'a'}
            onChange={handleChoice}
            id="a"
          />
          <label htmlFor="a">
            <p className="choiceLetter">A</p>
            <p className="choiceText">{question.a.choice}</p>
          </label>
        </li>
        <li>
          <input
            type="radio"
            name="choice"
            value="b"
            checked={choice === 'b'}
            onChange={handleChoice}
            id="b"
          />
          <label htmlFor="b">
            <p className="choiceLetter">B</p>
            <p className="choiceText">{question.b.choice}</p>
          </label>
        </li>
        <li>
          <input
            type="radio"
            name="choice"
            value="c"
            checked={choice === 'c'}
            onChange={handleChoice}
            id="c"
          />
          <label htmlFor="c">
            <p className="choiceLetter">C</p>
            <p className="choiceText">{question.c.choice}</p>
          </label>
        </li>
        <li>
          <input
            type="radio"
            name="choice"
            value="d"
            checked={choice === 'd'}
            onChange={handleChoice}
            id="d"
          />
          <label htmlFor="d">
            <p className="choiceLetter">D</p>
            <p className="choiceText">{question.d.choice}</p>
          </label>
        </li>
      </ul>
      <div className="buttonContainer">
        {/* {Hide the Previous button when the user it at question #1.} */}
        {questionNumber !== 0 ? (
          <button className="prev" onClick={handlePrevClick}>
            Prev
          </button>
        ) : null}

        {/* {Show the Submit button when the user is on the last question. Otherwise, show the Next button.} */} 
        {questionNumber + 1 === repo.length ? (
          <button className="submit" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className="next" onClick={handleNextClick}>
            Next
          </button>
        )}
      </div>
    </form>
  );
}

export default Quiz;