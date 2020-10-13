/*=====================================
Quiz is a child component of App and contains the quiz proper.
It fetches the quiz data from Open Trivia DB API and uses the he library to decode HTML entities.
=====================================*/

import React, { useState, useEffect } from 'react';
import he from 'he';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import QuizSvg from './SVG/QuizSvg';
import './css/Quiz.css';

function Quiz(props) {
  // States for the quiz itself
  const [questionNumber, setQuestionNumber] = useState(0);
  const [choice, setChoice] = useState(null);
  const { handleDataFetch, question, category, difficulty } = props;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(
          'https://opentdb.com/api.php?amount=10&category=' +
            category +
            '&difficulty=' +
            difficulty +
            '&type=multiple'
        );
        const jsonData = await data.json();

        // Join the correct answer and incorrect answers in an array and shuffle them.
        jsonData.results.map((item) => {
          const answerPosition = Math.floor(Math.random() * 3);
          const choiceArray = [...item.incorrect_answers];
          choiceArray.splice(answerPosition - 1, 0, item.correct_answer);
          return (item.choices = choiceArray);
        });

        // Open Trivia DB contains HTML entities. Use the he library to decode all of them.
        const formattedData = jsonData.results.map((item) => {
          item.question = he.decode(item.question);
          item.choices = item.choices.map((item) => he.decode(item));
          item.correct_answer = he.decode(item.correct_answer);
          return item;
        });

        handleDataFetch(formattedData, true);
      } catch (err) {
        return (
          <p>
            Oops! It seems there's an error getting the quiz. Refresh the page
            and try again.
          </p>
        );
      }
    };
    getData();

    // Set the contents of the localStorage to null so that the code inside Results.js will not result to an undefined.
    const initializeStorage = () => {
      for (let i = 0; i < 10; i++) {
        window.localStorage.setItem(i, 'null');
      }
    };
    initializeStorage();
  }, [category, difficulty]);

  /* ===== Quiz Functions ===== */

  function handleChoice(event) {
    setChoice(event.target.value);
  }

  function handleNextClick(event) {
    event.preventDefault();
    // Generate the next question and questionNumber.
    setQuestionNumber((previous) => previous + 1);

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
    // Generate the previous questionNumber.
    setQuestionNumber((previous) => previous - 1);

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

  const displayQuiz = () => {
    if (!question.isLoaded) {
      return (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      );
    } else {
      return (
        <div className="mainContainer">
          <div className = "progressAndTimerContainer">
            <Timer handleResult={props.handleResult} />
            <ProgressBar />
          </div>

          <div className="container quizProper">
            <form className="content-container">
              
              <p className="questionNumber">Question #{questionNumber + 1}</p>
              <p className="question">
                {question.content[questionNumber].question}
              </p>

              <ul className="choicesContainer">
                {question.content[questionNumber].choices.map((item, index) => {
                  return (
                    <li key={index}>
                      <input
                        type="radio"
                        name="choice"
                        value={item}
                        checked={choice === item}
                        onChange={handleChoice}
                        id={item}
                      />
                      <label htmlFor={item}>
                        <p className="choiceText">{item}</p>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <div
                className="buttonContainer"
                style={{
                  justifyContent:
                    questionNumber === 0 ? 'flex-end' : 'space-between',
                }}
              >
                {/* {Hide the Previous button when the user it at question #1.} */}
                {questionNumber !== 0 ? (
                  <button className="prev" onClick={handlePrevClick}>
                    Prev
                  </button>
                ) : null}

                {/* {Show the Submit button when the user is on the last question. Otherwise, show the Next button.} */}
                {questionNumber + 1 === question.content.length ? (
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
            <div className="side-svg-container">
              <QuizSvg />
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{displayQuiz()}</div>;
}

export default Quiz;
