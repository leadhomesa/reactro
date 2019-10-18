import React from 'react';
import PropTypes from 'prop-types';

const RadioButton = ({ input, children }) => (
  <label>
    <input type='radio' className='nes-radio' {...input} />
    {children}
  </label>
);

RadioButton.propTypes = {
  input: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default RadioButton;
