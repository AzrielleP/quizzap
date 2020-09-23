/*=====================================
Intro is a child component of App. 
This component enables the user to select the quiz category and start the quiz.
=====================================*/

import React from 'react';

function Intro(props) {
  return (
    <div>
      <h1>
        Welcome to <span className="title">Quizzap</span>
      </h1>
      <p className="subtext">Answer all questions within the time limit!</p>

      <div className="selector">
        <p>Category</p>
        <select className="category-selector">
          <option value="general-knowledge">General Knowledge</option>
        </select>
      </div>

      <div className="selector">
        <p>Difficulty</p>
        <select className="difficulty-selector">
          <option value="easy">Easy</option>
        </select>
      </div>

      <button className="startQuiz" onClick={props.handleStartQuiz}>
        Take Quiz
      </button>
    </div>
  );
}

export default Intro;
