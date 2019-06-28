import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import styles from './style.css';

const SimpleForm = ({ onSubmit, inputLabel }) => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, pristine }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className='nes-field'>
            <label>{inputLabel}</label>
            <Field
              component='input'
              type='text'
              name='value'
              className={classNames('nes-input', styles.input)}
            />
          </div>
          <button
            type='submit'
            className={classNames('nes-btn', 'is-primary', styles.submit)}
            disabled={pristine}
          >
            Add
          </button>
        </form>
      )}
    />
  );
};

SimpleForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputLabel: PropTypes.string.isRequired
};

export default SimpleForm;
