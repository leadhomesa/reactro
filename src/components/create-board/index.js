/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';

// components
import Section from 'components/section';
import RadioButton from 'components/radio-button';

// styles
import styles from './style.css';

const getQuarter = () => {
  const month = new Date().getMonth() + 3;
  return Math.floor(month / 3);
};

const CreateBoardForm = ({ onSubmit }) => {
  const currentQuarter = `Q${getQuarter()}`;
  return (
    <Form
      onSubmit={({ quarter, sprintNumber }) => {
        const boardName = `${quarter} - Sprint ${sprintNumber}`;
        onSubmit(boardName);
      }}
      initialValues={{
        quarter: currentQuarter
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
            <div className={classNames(styles.field)}>
              <label>Quarter</label>
              <div className={styles.radioButtons}>
                <Field
                  name='quarter'
                  type='radio'
                  value='Q1'
                  component={RadioButton}
                >
                  <span>Q1</span>
                </Field>
                <Field
                  name='quarter'
                  type='radio'
                  value='Q2'
                  component={RadioButton}
                >
                  <span>Q2</span>
                </Field>
                <Field
                  name='quarter'
                  type='radio'
                  value='Q3'
                  component={RadioButton}
                >
                  <span>Q3</span>
                </Field>
                <Field
                  name='quarter'
                  type='radio'
                  value='Q4'
                  component={RadioButton}
                >
                  <span>Q4</span>
                </Field>
              </div>
            </div>
            <div className={classNames('nes-field', styles.field)}>
              <label>Sprint Number</label>
              <Field
                component='input'
                type='number'
                name='sprintNumber'
                className={classNames('nes-input', styles.input)}
              />
            </div>
            <button
              type='submit'
              className={classNames('nes-btn', 'is-primary', styles.submit)}
              disabled={pristine}
            >
              Create
            </button>
          </Section>
        </form>
      )}
    />
  );
};

CreateBoardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default CreateBoardForm;
