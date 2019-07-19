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
          {x}
        </div>
      ))}
  </div>
);

SectionList.propTypes = {
  items: PropTypes.array,
  onDelete: PropTypes.func
};

export default SectionList;
