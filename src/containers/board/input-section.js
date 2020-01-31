import React from 'react';
import PropTypes from 'prop-types';

// components
import SimpleForm from 'components/simple-form';

import { addToBoard } from './helpers';

import styles from './style.css';

const InputSection = ({
  boardId,
  goodItems,
  badItems,
  actionItems,
  userId
}) => (
  <div className={styles.grid}>
    <SimpleForm
      useTextArea
      inputLabel='What`s good'
      onSubmit={({ value }) =>
        addToBoard({
          id: boardId,
          items: goodItems,
          newItem: { uid: userId, value },
          type: 'good'
        })
      }
    />
    <SimpleForm
      useTextArea
      inputLabel='What`s bad'
      onSubmit={({ value }) =>
        addToBoard({
          id: boardId,
          items: badItems,
          newItem: { uid: userId, value },
          type: 'bad'
        })
      }
    />
    <SimpleForm
      useTextArea
      inputLabel='Actionable?'
      onSubmit={({ value }) =>
        addToBoard({
          id: boardId,
          items: actionItems,
          newItem: { uid: userId, value },
          type: 'action'
        })
      }
    />
  </div>
);

const itemType = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
});

InputSection.propTypes = {
  boardId: PropTypes.string.isRequired,
  goodItems: PropTypes.arrayOf(itemType),
  badItems: PropTypes.arrayOf(itemType),
  actionItems: PropTypes.arrayOf(itemType),
  userId: PropTypes.string.isRequired
};

export default InputSection;
