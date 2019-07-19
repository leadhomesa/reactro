import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

const SectionList = ({ items, onDelete }) => (
  <div className={classNames('nes-list', 'is-desc', styles.list)}>
    {items &&
      items.map((x, index) => (
        <div
          key={`item-${index}`}
          onClick={() => onDelete(index)}
          className={styles.item}
        >
          <div className={styles.text}>{x}</div>
          <i
            className={classNames(
              'nes-icon',
              'close',
              'is-small',
              styles.delete
            )}
          />
        </div>
      ))}
  </div>
);

SectionList.propTypes = {
  items: PropTypes.array,
  onDelete: PropTypes.func
};

export default SectionList;
