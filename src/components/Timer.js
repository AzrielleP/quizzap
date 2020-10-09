import React, {useState, useEffect} from 'react';

export default function Timer(props) {

  // States for the timer
  const [time, handleTime] = useState({});
  const [counter, handleCounter] = useState(300);

  /* ===== Timer Functions ===== */

  const formatTime = () => {
    handleTime({
      minutes:Math.floor((counter % 3600) / 60),
      seconds: Math.floor(counter % 60)
    })
  }

  useEffect(() => {
    // Start the countdown as soon as the component is mounter. If it reaches 0, automatically go to the Results component.
    (counter >= 0 && setTimeout(() => handleCounter(counter - 1), 1000)) || props.handleResult();
    formatTime();
    
  }, [counter]);

  return (
    <p>{time.minutes} : {time.seconds}</p>
  )
}