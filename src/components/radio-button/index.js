import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './style.css';

const RadioButton = ({ input, children }) => (
  <label>
    <input
      type='radio'
      className={classnames('nes-radio', styles.radio)}
      {...input}
    />
    {children}
  </label>
);

RadioButton.propTypes = {
  input: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default RadioButton;
