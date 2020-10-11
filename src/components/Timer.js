import React, { useState, useEffect } from 'react';

export default function Timer(props) {
  const [time, setTime] = useState({});
  const [counter, setCounter] = useState(600);
  const { handleResult } = props;

  useEffect(() => {
    const formatTime = () => {
      setTime({
        minutes: Math.floor((counter % 3600) / 60),
        seconds: Math.floor(counter % 60),
      });
    };
    formatTime();

    // Start the countdown as soon as the component is mounted. If it reaches 0, automatically go to the Results component.
    let countdown = setTimeout(() => setCounter(counter - 1), 1000);
    if (counter < 0) {
      handleResult();
    }

    return () => clearTimeout(countdown);
  }, [counter, handleResult]);

  return (
    <p className="timer">
      {time.minutes} : {time.seconds}
    </p>
  );
}
