import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

const SectionList = ({ items, userIcons, onDelete }) => (
  <div className={classNames('nes-list', 'is-desc', styles.list)}>
    {items &&
      items.map((x, index) => (
        <div key={`item-${index}`} className={styles.item}>
          <div className={styles.text}>{(x && x.value) || x}</div>
          <i
            className={classNames(
              `nes-${userIcons[x.uid] || 'bulbasaur'}`,
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
  userIcons: PropTypes.array,
  items: PropTypes.array,
  onDelete: PropTypes.func
};

export default SectionList;
