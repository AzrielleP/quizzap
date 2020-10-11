import React, { useState, useEffect } from 'react';

function ProgressBar() {
  const [length] = useState(localStorage.length);
  const [answeredItems, setAnsweredItems] = useState(0);
  const storageContents = Object.entries(localStorage);

  useEffect(() => {
    let count = 0;
    for (let element of storageContents) {
      if (element[1] !== 'null') {
        count++;
      }
    }
    setAnsweredItems(count);
  }, [storageContents]);

  return (
    <div className = "progressBar">
        <progress value={answeredItems} max={length} />
        <p className = "progressStatus">Questions Answered: {answeredItems}/{length}</p>
    </div>
  )

}

export default ProgressBar;
