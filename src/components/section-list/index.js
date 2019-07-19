import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

const mapItems = (items, onDelete) => {
  const output = [];
  const divider = (
    <div className={styles.item}>
      <div className={styles.line} />
    </div>
  );

  output.push(divider);
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    output.push(
      <div onClick={() => onDelete(i)} className={styles.item}>
        {item}
      </div>
    );
    output.push(divider);
  }

  return output;
};

const SectionList = ({ items, onDelete }) => (
  <div className={classNames('nes-list', 'is-desc', styles.list)}>
    {items && mapItems(items, onDelete)}
  </div>
);

SectionList.propTypes = {
  items: PropTypes.array,
  onDelete: PropTypes.func
};

export default SectionList;
