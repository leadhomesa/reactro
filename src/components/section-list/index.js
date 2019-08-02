import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

const SectionList = ({ items, onDelete }) => (
  <div className={classNames('nes-list', 'is-desc', styles.list)}>
    {items &&
      items.map((x, index) => (
        <div key={`item-${index}`} className={styles.item}>
          <div className={styles.text}>{(x && x.value) || x}</div>
          <i
            className={classNames(
              'nes-icon',
              'close',
              'is-small',
              styles.delete
            )}
            onClick={() => onDelete(index)}
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
