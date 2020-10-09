/*=====================================
Quiz is a child component of App and contains the quiz proper.
It fetches the quiz data from Open Trivia DB API.
=====================================*/

import React, { useState, useEffect } from 'react';
import Timer from './Timer';

function Quiz(props) {
  // States for the quiz itself
  const [questionNumber, setQuestionNumber] = useState(0);
  const [choice, setChoice] = useState(null);
  const { handleDataFetch, question, category, difficulty } = props;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch(
          'https://opentdb.com/api.php?amount=20&category=' + category + '&difficulty=' + difficulty + '&type=multiple'
        );
        const jsonData = await data.json();

        // Join the correct answer and incorrect answers in an array and shuffle them.
        jsonData.results.map((item) => {
          const answerPosition = Math.floor(Math.random() * 3);
          const choiceArray = [...item.incorrect_answers];
          choiceArray.splice(answerPosition - 1, 0, item.correct_answer);
          return (item.choices = choiceArray);
        });

        handleDataFetch(jsonData.results, true);
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
      for (let i = 0; i < 20; i++) {
        window.localStorage.setItem(i, 'null');
      }
    };

    initializeStorage();
  }, []);

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
        <div className="container">
          <div className="loader"></div>
        </div>
      );
    } else {
      return (
        <div className="container quizProper">
          <form className="content-container">
            <Timer handleResult={props.handleResult} />
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
            <div className="buttonContainer" style = {{justifyContent: questionNumber === 0 ? 'flex-end' : 'space-between'}}>
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
            <svg
              width="460"
              height="331"
              viewBox="0 0 546 395"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M478.971 192.402H474.111V384.744H478.971V192.402Z"
                  fill="#3F3D56"
                />
                <path
                  d="M523.826 216.913C524.136 284.171 476.905 338.913 476.905 338.913C476.905 338.913 429.174 284.609 428.864 217.352C428.555 150.094 475.785 95.3521 475.785 95.3521C475.785 95.3521 523.517 149.656 523.826 216.913Z"
                  fill="#3F3D56"
                />
                <path
                  d="M381.791 282.902H379.291V381.828H381.791V282.902Z"
                  fill="#3F3D56"
                />
                <path
                  d="M404.861 295.509C405.02 330.101 380.728 358.256 380.728 358.256C380.728 358.256 356.179 330.326 356.02 295.734C355.861 261.142 380.152 232.987 380.152 232.987C380.152 232.987 404.702 260.917 404.861 295.509Z"
                  fill="#3F3D56"
                />
                <path
                  d="M431.062 395C468.467 395 498.789 390.343 498.789 384.599C498.789 378.855 468.467 374.198 431.062 374.198C393.658 374.198 363.336 378.855 363.336 384.599C363.336 390.343 393.658 395 431.062 395Z"
                  fill="#3F3D56"
                />
                <path
                  d="M436.648 142.188C430.91 132.474 419.558 132.022 419.558 132.022C419.558 132.022 408.496 130.604 401.4 145.398C394.786 159.188 385.657 172.501 399.93 175.729L402.509 167.69L404.105 176.328C406.137 176.474 408.176 176.509 410.212 176.432C425.497 175.938 440.054 176.577 439.585 171.082C438.962 163.776 442.169 151.534 436.648 142.188Z"
                  fill="#2F2E41"
                />
                <path
                  d="M415.985 160.481C415.985 160.481 423.4 170.882 418.951 179.302C414.501 187.722 429.332 196.637 429.332 196.637L440.208 172.863C440.208 172.863 427.355 164.443 430.815 156.519L415.985 160.481Z"
                  fill="#FBBEBE"
                />
                <path
                  d="M420.928 164.939C428.027 164.939 433.781 159.173 433.781 152.061C433.781 144.949 428.027 139.184 420.928 139.184C413.829 139.184 408.075 144.949 408.075 152.061C408.075 159.173 413.829 164.939 420.928 164.939Z"
                  fill="#FBBEBE"
                />
                <path
                  d="M376.446 166.947L387.188 153.063C387.188 153.063 390.97 138.509 396.447 139.246C401.925 139.984 394.284 156.7 394.284 156.7L383.611 172.069L376.446 166.947Z"
                  fill="#FBBEBE"
                />
                <path
                  d="M430.815 351.662L434.276 369.988L441.691 371.969L439.714 350.176L430.815 351.662Z"
                  fill="#FBBEBE"
                />
                <path
                  d="M505.463 331.851L518.811 350.176L524.249 352.653L528.698 345.224L515.35 327.888L505.463 331.851Z"
                  fill="#FBBEBE"
                />
                <path
                  d="M427.849 188.712L419.603 177.836C419.603 177.836 403.626 180.788 402.143 182.274C400.66 183.759 406.097 211 406.097 211C406.097 211 407.086 218.43 411.535 222.392L415.985 225.364L452.567 217.934L453.942 201.627C454.444 195.687 453.7 189.707 451.761 184.072C449.822 178.436 446.728 173.269 442.68 168.901L436.315 169.773L427.849 188.712Z"
                  fill="#575A89"
                />
                <path
                  d="M404.12 183.264L401.648 182.274L390.278 181.283C390.278 181.283 386.323 180.292 387.312 178.311C388.3 176.33 389.289 175.835 387.312 175.34C385.334 174.844 384.84 174.349 385.334 172.863C385.829 171.377 388.795 168.406 388.795 168.406L380.391 161.471C380.391 161.471 379.936 161.794 379.201 162.39C375.028 165.775 361.826 177.987 371.492 190.198C382.863 204.562 396.21 212.981 407.086 210.01L404.12 183.264Z"
                  fill="#575A89"
                />
                <path
                  d="M414.996 222.887V229.821C414.996 229.821 410.547 238.241 412.03 246.166C413.513 254.09 414.007 258.053 414.007 258.053C414.168 264.792 415.335 271.47 417.468 277.864C420.928 287.77 409.558 352.653 423.894 353.643C438.23 354.634 446.14 355.625 450.589 350.672C455.039 345.719 443.174 260.529 443.174 260.529C443.174 260.529 483.711 345.224 492.115 341.757C500.519 338.289 521.777 330.365 519.305 325.907C516.833 321.45 454.544 222.392 454.544 222.392L452.567 217.934L414.996 222.887Z"
                  fill="#2F2E41"
                />
                <path
                  d="M438.725 366.521C438.725 366.521 430.815 366.026 430.815 368.502C430.815 370.979 426.86 379.398 426.86 379.398C426.86 379.398 423.894 389.304 431.804 388.314C439.714 387.323 444.657 378.408 444.657 378.408L442.68 368.997L438.725 366.521Z"
                  fill="#2F2E41"
                />
                <path
                  d="M521.282 349.186C521.282 349.186 514.361 344.728 514.855 347.7C515.35 350.672 515.844 358.596 519.305 359.092C522.765 359.587 533.147 362.559 533.641 363.549C534.135 364.54 546 368.502 546 362.063C546 355.625 538.584 350.672 538.584 350.672L530.18 344.233C530.18 344.233 524.743 343.738 523.754 347.205C522.765 350.672 521.282 349.186 521.282 349.186Z"
                  fill="#2F2E41"
                />
                <path
                  d="M420.948 140.295C425.481 140.295 429.156 136.613 429.156 132.071C429.156 127.529 425.481 123.847 420.948 123.847C416.414 123.847 412.74 127.529 412.74 132.071C412.74 136.613 416.414 140.295 420.948 140.295Z"
                  fill="#2F2E41"
                />
                <path
                  d="M411.875 129.907C411.876 127.876 412.626 125.917 413.982 124.407C415.338 122.897 417.204 121.943 419.22 121.729C418.933 121.699 418.644 121.683 418.356 121.683C416.179 121.683 414.091 122.55 412.551 124.092C411.012 125.634 410.147 127.726 410.147 129.907C410.147 132.088 411.012 134.18 412.551 135.722C414.091 137.264 416.179 138.13 418.356 138.13C418.644 138.13 418.933 138.115 419.22 138.084C417.204 137.87 415.338 136.917 413.982 135.407C412.626 133.897 411.876 131.938 411.875 129.907Z"
                  fill="#2F2E41"
                />
                <path
                  d="M434.111 141.252L422.896 135.366L407.408 137.774L404.204 151.953L412.181 151.645L414.409 146.437V151.56L418.09 151.418L420.226 143.125L421.561 151.953L434.646 151.686L434.111 141.252Z"
                  fill="#2F2E41"
                />
                <path
                  d="M433.44 224.035L416.144 224.503C416.144 224.503 401.385 227.38 402.213 221.412C403.041 215.444 417.439 217.532 417.439 217.532L433.199 215.123L433.44 224.035Z"
                  fill="#FBBEBE"
                />
                <path
                  d="M447.125 168.061C447.994 167.929 448.882 168.113 449.628 168.578C450.374 169.044 450.93 169.761 451.196 170.601C454.582 181.291 465.014 217.066 454.649 221.974C442.442 227.755 433.533 227.5 433.533 227.5L428.765 215.738L433.106 211.657L437.74 181.803L439.961 169.148L447.125 168.061Z"
                  fill="#575A89"
                />
                <path
                  opacity="0.4"
                  d="M443.916 187.969L441.938 207.781L424.636 215.21L443.916 210.753V187.969Z"
                  fill="black"
                />
                <path
                  d="M350.604 122.565C356.177 124.045 360.998 127.554 364.126 132.407L365.743 134.916L365.824 135.019L394.193 143.336C394.713 143.488 395.152 143.839 395.417 144.313C395.681 144.787 395.75 145.346 395.607 145.869L393.405 153.96C393.333 154.223 393.21 154.47 393.042 154.686C392.875 154.902 392.667 155.082 392.43 155.217C392.193 155.352 391.931 155.438 391.661 155.471C391.39 155.504 391.115 155.484 390.853 155.41L362.477 147.464L362.477 147.465L359.627 148.544C354.379 150.532 348.623 150.728 343.253 149.102L350.604 122.565Z"
                  fill="#3F3D56"
                />
                <path
                  d="M380.479 146.029C380.748 145.109 379.57 143.954 377.848 143.449C376.127 142.944 374.513 143.281 374.244 144.201C373.976 145.121 375.154 146.276 376.875 146.781C378.597 147.285 380.211 146.949 380.479 146.029Z"
                  fill="#575A89"
                />
                <path
                  d="M379.03 146.877C379.688 146.877 380.221 146.343 380.221 145.684C380.221 145.025 379.688 144.491 379.03 144.491C378.372 144.491 377.839 145.025 377.839 145.684C377.839 146.343 378.372 146.877 379.03 146.877Z"
                  fill="#3F3D56"
                />
                <path
                  d="M352.976 137.89C355.341 130.581 354.585 123.787 351.285 122.715C347.986 121.643 343.394 126.699 341.029 134.009C338.663 141.318 339.42 148.112 342.719 149.184C346.018 150.256 350.61 145.199 352.976 137.89Z"
                  fill="#3581B8"
                />
                <path
                  opacity="0.4"
                  d="M352.094 137.631C354.373 130.589 353.753 124.025 350.754 122.597C350.934 122.619 351.112 122.659 351.285 122.715C354.584 123.787 355.341 130.581 352.976 137.89C350.61 145.199 346.018 150.256 342.719 149.184C342.599 149.145 342.482 149.098 342.369 149.043C345.614 149.457 349.853 144.556 352.094 137.631Z"
                  fill="black"
                />
                <path
                  d="M350.977 122.591L286.593 72.5547C275.208 63.6427 264.282 54.1564 253.859 44.1323C235.506 26.6052 210.592 12.592 181.584 5.13121C111.108 -12.9952 55.2768 19.1451 29.8831 66.3381C-8.9211 138.454 -38.6594 255.479 133.398 193.186C171.027 179.563 209.116 178.115 237.997 170.939L342.573 149.337L350.977 122.591Z"
                  fill="#3581B8"
                />
                <path
                  d="M157.684 38.3924C159.595 38.3924 161.144 36.8401 161.144 34.9253C161.144 33.0105 159.595 31.4583 157.684 31.4583C155.773 31.4583 154.223 33.0105 154.223 34.9253C154.223 36.8401 155.773 38.3924 157.684 38.3924Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M224.907 42.939H224.006V42.0366H223.83V42.939H222.929V43.1154H223.83V44.0178H224.006V43.1154H224.907V42.939Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M315.373 118.223H314.473V117.32H314.297V118.223H313.396V118.399H314.297V119.302H314.473V118.399H315.373V118.223Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M308.947 141.501H308.046V140.599H307.87V141.501H306.969V141.678H307.87V142.58H308.046V141.678H308.947V141.501Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M32.6023 161.313H31.7016V160.411H31.5256V161.313H30.6249V161.489H31.5256V162.392H31.7016V161.489H32.6023V161.313Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M72.1507 53.3401H71.25V52.4377H71.074V53.3401H70.1733V53.5164H71.074V54.4188H71.25V53.5164H72.1507V53.3401Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M225.895 145.464H224.995V144.561H224.819V145.464H223.918V145.64H224.819V146.542H224.995V145.64H225.895V145.464Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M131.473 21.6416H130.573V20.7392H130.397V21.6416H129.496V21.8179H130.397V22.7204H130.573V21.8179H131.473V21.6416Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M131.819 92.9523L130.697 93.1256C131.048 95.3742 131.325 97.6724 131.528 99.9458L132.66 99.8467C132.457 97.5436 132.175 95.2257 131.819 92.9523Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M128.749 79.4111L127.662 79.7429C128.319 81.9222 128.908 84.1559 129.407 86.3798L130.519 86.1272C130.01 83.8786 129.412 81.6201 128.749 79.4111Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M123.851 66.4246L122.817 66.9001C123.767 68.9754 124.656 71.1051 125.462 73.2348L126.525 72.8337C125.709 70.6791 124.815 68.5197 123.851 66.4246Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M117.226 54.2504L116.267 54.8596C117.488 56.7813 118.66 58.7724 119.747 60.7684L120.746 60.2236C119.648 58.2028 118.462 56.1919 117.226 54.2504Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M108.99 43.0916L108.125 43.8296C109.598 45.5631 111.032 47.3759 112.386 49.2084L113.296 48.5299C111.932 46.6775 110.483 44.8449 108.99 43.0916Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M99.3106 33.1561L98.5543 34.0031C100.255 35.5236 101.921 37.1234 103.508 38.7529L104.323 37.9555C102.717 36.3062 101.031 34.6915 99.3106 33.1561Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M88.3755 24.6272L87.7378 25.5682C89.6262 26.8411 91.4949 28.1982 93.2894 29.5999L93.9914 28.7034C92.1722 27.2869 90.2837 25.915 88.3755 24.6272Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M78.4241 18.7036V19.9914C79.6056 20.6105 80.7772 21.2593 81.9241 21.923L82.4927 20.9374C81.1579 20.1647 79.8017 19.4201 78.4241 18.7036Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M131.896 106.972L133.032 106.951C133.053 108.101 133.055 109.256 133.037 110.386L131.901 110.369C131.918 109.251 131.917 108.109 131.896 106.972Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M65.0815 190.524L63.9593 190.697C64.3103 192.946 64.5871 195.244 64.7898 197.518L65.9219 197.419C65.7192 195.115 65.4374 192.798 65.0815 190.524Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M62.0115 176.983L60.9239 177.315C61.5814 179.494 62.1697 181.728 62.669 183.952L63.7813 183.699C63.2721 181.45 62.674 179.192 62.0115 176.983Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M57.1125 163.996L56.0793 164.472C57.0285 166.547 57.9183 168.677 58.7241 170.807L59.787 170.405C58.9713 168.251 58.0765 166.091 57.1125 163.996Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M50.4882 151.822L49.5291 152.431C50.7502 154.353 51.9218 156.344 53.0094 158.34L54.008 157.795C52.9105 155.775 51.7241 153.764 50.4882 151.822Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M42.2522 140.663L41.3871 141.401C42.8602 143.135 44.2939 144.948 45.6484 146.78L46.558 146.102C45.1936 144.249 43.7451 142.417 42.2522 140.663Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M32.5727 130.728L31.8163 131.575C33.5169 133.095 35.1829 134.695 36.7698 136.325L37.5855 135.527C35.9788 133.878 34.293 132.263 32.5727 130.728Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M21.6376 122.199L20.9999 123.14C22.8883 124.413 24.757 125.77 26.5515 127.172L27.2535 126.275C25.4342 124.859 23.5458 123.487 21.6376 122.199Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M11.6862 116.275V117.563C12.8677 118.182 14.0393 118.831 15.1862 119.495L15.7547 118.509C14.4199 117.736 13.0638 116.992 11.6862 116.275Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M65.1582 204.544L66.2945 204.523C66.3154 205.673 66.3169 206.828 66.2992 207.958L65.1629 207.94C65.1802 206.823 65.1787 205.68 65.1582 204.544Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M293.474 141.491L292.351 141.664C292.702 143.913 292.979 146.211 293.182 148.484L294.314 148.385C294.111 146.082 293.83 143.764 293.474 141.491Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M290.404 127.949L289.316 128.281C289.974 130.46 290.562 132.694 291.061 134.918L292.174 134.665C291.664 132.417 291.066 130.158 290.404 127.949Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M285.505 114.963L284.471 115.438C285.421 117.514 286.31 119.643 287.116 121.773L288.179 121.372C287.363 119.217 286.469 117.058 285.505 114.963Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M278.88 102.789L277.921 103.398C279.142 105.32 280.314 107.311 281.402 109.307L282.4 108.762C281.303 106.741 280.116 104.73 278.88 102.789Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M270.644 91.6299L269.779 92.3679C271.253 94.1014 272.686 95.9141 274.041 97.7467L274.95 97.0681C273.586 95.2158 272.137 93.3832 270.644 91.6299Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M260.965 81.6944L260.208 82.5413C261.909 84.0619 263.575 85.6617 265.162 87.2912L265.977 86.4937C264.371 84.8444 262.685 83.2298 260.965 81.6944Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M250.03 73.1655L249.392 74.1065C251.28 75.3794 253.149 76.7365 254.944 78.1382L255.646 77.2417C253.826 75.8252 251.938 74.4532 250.03 73.1655Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M240.078 67.2419V68.5296C241.26 69.1487 242.432 69.7976 243.578 70.4612L244.147 69.4756C242.812 68.703 241.456 67.9584 240.078 67.2419Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M293.55 155.51L294.687 155.489C294.708 156.639 294.709 157.795 294.691 158.925L293.555 158.907C293.572 157.79 293.571 156.647 293.55 155.51Z"
                  fill="#E6E6E6"
                />
                <path
                  d="M73.8048 99.0057H72.9668V98.1657H72.8032V99.0057H71.9648V99.1692H72.8032V100.009H72.9668V99.1692H73.8048V99.0057Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M64.1446 149.702H63.3067V148.862H63.1431V149.702H62.3046V149.866H63.1431V150.705H63.3067V149.866H64.1446V149.702Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M35.7998 194.133H34.9613V193.293H34.7977V194.133H33.9598V194.297H34.7977V195.137H34.9613V194.297H35.7998V194.133Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M114.65 137.781C106.546 125.711 103.027 111.132 104.732 96.6865C106.436 82.2408 113.252 68.8855 123.942 59.0424C134.632 49.1994 148.488 43.5203 162.999 43.0351C177.51 42.5499 191.714 47.2907 203.035 56.3978C214.356 65.5049 222.045 78.3752 224.707 92.6748C227.369 106.974 224.829 121.756 217.546 134.34C210.263 146.924 198.72 156.476 185.01 161.265C171.301 166.053 156.332 165.761 142.819 160.441C141.943 163.574 140.306 166.44 138.053 168.783C135.8 171.126 133.002 172.873 129.91 173.867C126.818 174.862 123.528 175.072 120.335 174.48C117.142 173.888 114.145 172.512 111.613 170.475C109.081 168.438 107.093 165.804 105.826 162.808C104.559 159.813 104.054 156.549 104.355 153.31C104.655 150.07 105.753 146.956 107.55 144.246C109.347 141.536 111.786 139.315 114.65 137.781Z"
                  fill="#3F3D56"
                />
                <path
                  d="M164.684 69.0615C178.602 69.0615 188.177 76.796 188.177 87.9143C188.177 95.2769 184.614 100.371 177.748 104.424C171.29 108.18 169.1 110.932 169.1 115.691C169.1 116.077 169.025 116.459 168.877 116.816C168.73 117.172 168.514 117.496 168.242 117.769C167.969 118.041 167.646 118.258 167.29 118.405C166.935 118.553 166.553 118.629 166.168 118.629H159.053C158.293 118.629 157.563 118.333 157.016 117.805C156.47 117.276 156.149 116.555 156.123 115.794L156.11 115.431C155.479 107.771 158.151 103.011 164.869 99.0698C171.142 95.3141 173.777 92.9343 173.777 88.3233C173.777 83.7124 169.323 80.3286 163.793 80.3286C159.59 80.3286 156.263 82.3784 154.737 85.725C154.201 86.8579 153.352 87.8133 152.291 88.478C151.23 89.1428 150.001 89.4891 148.75 89.4761C143.929 89.4761 140.744 84.3396 142.999 80.0703C146.565 73.3167 154.09 69.0615 164.684 69.0615ZM154.922 132.797C154.922 128.52 158.486 125.136 162.865 125.136C167.282 125.136 170.845 128.483 170.845 132.797C170.845 137.11 167.282 140.457 162.865 140.457C158.448 140.457 154.922 137.11 154.922 132.797Z"
                  fill="#3581B8"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="546" height="395" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      );
    }
  };

  return <div>{displayQuiz()}</div>;
}

export default Quiz;
