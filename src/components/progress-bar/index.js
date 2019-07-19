import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [value, setValue] = useState(30);

  useEffect(() => {
    // on mount
    const intervalId = setInterval(() => {
      const newValue = value > 95 ? value : value + 5;
      setValue(newValue);
    }, 100);

    return () => {
      // will unmount
      clearInterval(intervalId);
    };
  });

  return (
    <progress className='nes-progress is-primary' value={value} max='100' />
  );
};

export default ProgressBar;
