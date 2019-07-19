import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import styles from './style.css';

const SimpleForm = ({ onSubmit, inputLabel, useTextArea = false }) => {
  const componentName = useTextArea ? 'textarea' : 'input';
  const nesClassName = useTextArea ? 'nes-textarea' : 'nes-input';
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, pristine, form }) => (
        <form
          className={styles.form}
          onSubmit={event => {
            handleSubmit(event);
            form.reset();
          }}
        >
          <div className='nes-field'>
            <label>{inputLabel}</label>
            <Field
              component={componentName}
              type='text'
              name='value'
              className={classNames(nesClassName, styles.input)}
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
  inputLabel: PropTypes.string.isRequired,
  useTextArea: PropTypes.bool
};

export default SimpleForm;
