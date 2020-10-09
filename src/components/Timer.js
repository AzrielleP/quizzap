import React, {useState, useEffect} from 'react';

export default function Timer(props) {

  // States for the timer
  const [time, handleTime] = useState({});
  const [counter, handleCounter] = useState(600);

  /* ===== Timer Functions ===== */

  const formatTime = () => {
    handleTime({
      minutes:Math.floor((counter % 3600) / 60),
      seconds: Math.floor(counter % 60)
    })
  }

  const resetTime = () => {
    handleCounter(5);
  }

  useEffect(() => {
    (counter > 0 && setTimeout(() => handleCounter(counter - 1), 1000)) || props.handleResult();
    formatTime();

    return () => resetTime
    
  }, [counter]);

  return (
    <p>{time.minutes} : {time.seconds}</p>
  )
}