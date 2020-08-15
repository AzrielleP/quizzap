import React, {useState} from 'react';
import repo from './questions.js';

function Quiz(props) {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [question, setQuestion] = useState(repo[questionNumber]);
  const [choice, setChoice] = useState('');
  const [answer, setAnswer] = useState([]);

  function handleChoice(event) {
    setChoice(event.target.value);
  }

  function handleNextClick(event) {
    event.preventDefault();
    setQuestionNumber((previous) => previous + 1);
    setQuestion(repo[questionNumber + 1]);
    setAnswer((previous) => previous.concat(choice));
    setChoice('');
  }

  function handlePrevClick(event) {
    event.preventDefault();
    setQuestionNumber((previous) => previous - 1);
    setQuestion(repo[questionNumber - 1]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAnswer((previous) => previous.concat(choice));
    calcScore();
  }

  function calcScore() {
    let score = 0;
    for (let i = 0; i < repo.length - 1; i++) {
      if (repo[i][answer[i]].correct) {
        score++;
      }
    }
    return score;
  }

  return (
    <form onSubmit={handleSubmit}>
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
        {questionNumber !== 0 ? (
          <button className="prev" onClick={handlePrevClick}>
            Prev
          </button>
        ) : null}

        {questionNumber + 1 === repo.length ? (
          <button className="submit">Submit</button>
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
