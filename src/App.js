import React, {useState} from 'react';
import repo from './questions.js';

function App() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [question, setQuestion] = useState(repo[questionNumber]);
  const [choice, setChoice] = useState('');

  // function handleChoice(event) {
  //   let {name, value} = event.target;
  //   setChoice(() => {
      
  //     [name] = value;
  //   })
  // }
  function handleNextClick() {
    setQuestionNumber(previous => previous + 1);
    setQuestion(previous => repo[questionNumber + 1]);
  }
  console.log(questionNumber);

  function handlePrevClick() {
    setQuestionNumber(previous => previous - 1);
    setQuestion(previous => repo[questionNumber - 1]);
  }

  return (

    <div>
      <h1>Question #{questionNumber + 1}</h1>
      <p>{question.question}</p>
      <ul className = 'choicesContainer'>
        <li>
          {/* <input 
            type = 'radio' 
            name = 'choice' 
            value = 'a' 
            checked = {choice === 'a'}
            onChange = {handleChoice}
            id = 'a'/> */}
          <label htmlFor = 'a'>
            <p className = 'choiceLetter'>A</p>
            <p className = 'choiceText'>{question.a.choice}</p>
          </label>
        </li>
        <li>
          {/* <input 
            type = 'radio' 
            name = 'choice' 
            value = 'a' 
            checked = {choice === 'a'}
            onChange = {handleChoice}
            id = 'a'/> */}
          <label htmlFor = 'b'>
            <p className = 'choiceLetter'>B</p>
            <p className = 'choiceText'>{question.b.choice}</p>
          </label>
        </li>
        <li>
          {/* <input 
            type = 'radio' 
            name = 'choice' 
            value = 'a' 
            checked = {choice === 'a'}
            onChange = {handleChoice}
            id = 'a'/> */}
          <label htmlFor = 'c'>
            <p className = 'choiceLetter'>C</p>
            <p className = 'choiceText'>{question.c.choice}</p>
          </label>
        </li>
        <li>
          {/* <input 
            type = 'radio' 
            name = 'choice' 
            value = 'a' 
            checked = {choice === 'a'}
            onChange = {handleChoice}
            id = 'a'/> */}
          <label htmlFor = 'd'>
            <p className = 'choiceLetter'>D</p>
            <p className = 'choiceText'>{question.d.choice}</p>
          </label>
        </li>
      </ul>
      <div className="buttonContainer">
        <button className = "prev" onClick = {handlePrevClick}>Prev</button>
        <button className= "next" onClick = {handleNextClick}>Next</button>
      </div>  
    </div>
  );
}

export default App;
