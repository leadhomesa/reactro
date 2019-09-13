/* eslint-disable jsx-a11y/label-has-associated-control */
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

const CreateBoardForm = ({ onSubmit }) => {
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
              <Field name='quarter' type='radio' value='Q1' component={Radio}>
                <span>Q1</span>
              </Field>
              <Field name='quarter' type='radio' value='Q2' component={Radio}>
                <span>Q2</span>
              </Field>
              <Field name='quarter' type='radio' value='Q3' component={Radio}>
                <span>Q3</span>
              </Field>
              <Field name='quarter' type='radio' value='Q4' component={Radio}>
                <span>Q4</span>
              </Field>
            </div>
            <div className={classNames('nes-field', styles.field)}>
              <label>Sprint Number</label>
              <Field
                component='input'
                type='text'
                name='sprintNumber'
                className={classNames('nes-input', styles.input)}
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

CreateBoardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

Radio.propTypes = {
  input: PropTypes.object.isRequired,
  children: PropTypes.array
};

export default CreateBoardForm;
