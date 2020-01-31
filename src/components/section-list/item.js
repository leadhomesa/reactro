/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './style.css';

const Item = ({
  item,
  index,
  onDelete,
  isExternalCharacter,
  character,
  onLike,
  userId
}) => {
  const hasLikes = item.likes && item.likes.length > 0;
  const hasLiked = item.likes && item.likes.includes(userId);
  return (
    <div className={styles.item}>
      {isExternalCharacter && (
        <img
          src={`/${character}.png`}
          alt={character}
          className={styles.character}
          onClick={() => onDelete(index)}
        />
      )}
      {!isExternalCharacter && (
        <i
          className={classNames(`nes-${character}`, 'is-small', styles.delete)}
          onClick={() => onDelete(index)}
        />
      )}
      <div className={styles.text}>{item.value}</div>
      <div className={styles.likes}>
        <i
          className={classNames(
            'nes-icon',
            'is-small',
            'heart',
            !hasLiked && 'is-empty'
          )}
          onClick={() => onLike(index)}
        />
        {hasLikes && <span>{item.likes.length}</span>}
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    uid: PropTypes.string
  }),
  index: PropTypes.number,
  onDelete: PropTypes.func,
  onLike: PropTypes.func,
  isExternalCharacter: PropTypes.bool,
  character: PropTypes.string,
  userId: PropTypes.string
};

export default Item;
