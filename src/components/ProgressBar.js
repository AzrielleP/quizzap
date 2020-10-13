/*=====================================
ProgressBar is a child component of Quiz. 
It shows how many answers the user has answered.
=====================================*/

import React, { useState, useEffect } from 'react';
import './css/ProgressBar.css';

function ProgressBar() {
  const [length] = useState(localStorage.length);
  const [answeredItems, setAnsweredItems] = useState(0);
  const storageContents = Object.entries(localStorage);

  /* storageContents returns an array of arrays, which looks like this:
  [ [key, value], [key,value], ...]
  */

  useEffect(() => {
    let count = 0;
    for (let element of storageContents) {
      // Check if the value of the key is not equal to null.
      if (element[1] !== 'null') {
        count++;
      }
    }
    setAnsweredItems(count);
  }, [storageContents]);

  return (
    <div className="progressBar">
      <progress value={answeredItems} max={length} />
      <p className="progressStatus">
        Questions Answered: {answeredItems}/{length}
      </p>
    </div>
  );
}

export default ProgressBar;
