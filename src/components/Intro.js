/*=====================================
Intro is a child component of App. 
This component enables the user to select the quiz category and start the quiz.
=====================================*/

import React from 'react';
import IntroSvg from './SVG/IntroSvg';

function Intro(props) {
  const {handleStartQuiz, handleQuizDifficulty, handleQuizCategory, difficulty, category} = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleStartQuiz();
  }

  return (
    <div className="intro-container">
      <div className="content-container">
        <h1>
          Welcome to <span className="title">Quizzap</span>
        </h1>
        <p className="subtext">Answer all questions within the time limit!</p>

        <form onSubmit = {handleSubmit} >
          <div className="selector">
            <p>Category</p>
            <select 
              className="category-selector"
              value = {category}
              onChange = {handleQuizCategory}
              name = "category"
            >
              <option value="9">General Knowledge</option>
              <option value = "11">Film</option>
              <option value = "12">Music</option>
              <option value = "14">Television</option>
              <option value = "15">Video Games</option>
              <option value = "17">Science & Nature</option>
              <option value = "18">Computers</option>
              <option value = "21">Sports</option>
            </select>
          </div>

          <div className="selector">
            <p>Difficulty</p>
            <select 
              className="difficulty-selector"
              value = {difficulty}
              onChange = {handleQuizDifficulty}
              name = "difficulty"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button className="startQuiz">
            Take Quiz
          </button>
        </form>
      </div>
      <div className="side-svg-container">
        <IntroSvg />
      </div>
    </div>
  );
}

export default Intro;
