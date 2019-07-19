import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

import Section from 'components/section';

import styles from './style.css';

const Radio = ({ input, children }) => (
  <label>
    <input type='radio' className='nes-radio' {...input} />
    {children}
  </label>
);

const CreateBoard = ({ onSubmit, useTextArea = false }) => {
  const nesClassName = useTextArea ? 'nes-textarea' : 'nes-input';
  return (
    <Form
      onSubmit={({ quarter, sprintNumber }) => {
        const boardName = `${quarter} - Sprint ${sprintNumber}`;
        onSubmit(boardName);
      }}
      initialValues={{
        quarter: '01'
      }}
      render={({ handleSubmit, pristine, form }) => (
        <form
          className={styles.form}
          onSubmit={event => {
            handleSubmit(event);
            form.reset();
          }}
        >
          <Section title='Create Board' className={styles.boards}>
            <label>Quarter</label>

            <div className={classNames(styles.field)}>
              <Field name='quarter' type='radio' value='01' component={Radio}>
                <span>01</span>
              </Field>
              <Field name='quarter' type='radio' value='02' component={Radio}>
                <span>02</span>
              </Field>
              <Field name='quarter' type='radio' value='03' component={Radio}>
                <span>03</span>
              </Field>
              <Field name='quarter' type='radio' value='04' component={Radio}>
                <span>04</span>
              </Field>
            </div>
            <div className={classNames('nes-field', styles.field)}>
              <label>Sprint Number</label>
              <Field
                component='input'
                type='text'
                name='sprintNumber'
                className={classNames(nesClassName, styles.input)}
              />
            </div>
          </Section>
          <button
            type='submit'
            className={classNames('nes-btn', 'is-primary', styles.submit)}
            disabled={pristine}
          >
            Create
          </button>
        </form>
      )}
    />
  );
};

CreateBoard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  useTextArea: PropTypes.bool
};

Radio.propTypes = {
  input: PropTypes.object.isRequired,
  children: PropTypes.array
};

export default CreateBoard;
