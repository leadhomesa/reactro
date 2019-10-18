import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import styles from './style.css';

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
  }, [value, setValue]);

  return (
    <progress
      className={classnames('nes-progress', 'is-primary', styles.progress)}
      value={value}
      max='100'
    />
  );
};

export default ProgressBar;
