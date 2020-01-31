/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Item from './item';
import styles from './style.css';

const extraCharacters = [
  'hollow-knight',
  'link-not-zelda',
  'mugman',
  'pepe',
  'sanic',
  'spongebob',
  'vaultboy'
];

const SectionList = ({ items, userIcons, onDelete, onLike, userId }) => (
  <div className={classNames('nes-list', 'is-desc', styles.list)}>
    {items &&
      items.map((x, index) => {
        const character = (userIcons && userIcons[x.uid]) || 'bulbasaur';
        const isExternalCharacter = extraCharacters.includes(character);

        return (
          <Item
            key={`item-${index}`}
            item={x}
            index={index}
            isExternalCharacter={isExternalCharacter}
            character={character}
            onDelete={() => onDelete(index)}
            onLike={() => onLike(index)}
            userId={userId}
          />
        );
      })}
  </div>
);

SectionList.propTypes = {
  userIcons: PropTypes.array,
  items: PropTypes.array,
  onDelete: PropTypes.func,
  onLike: PropTypes.func,
  userId: PropTypes.string
};

export default SectionList;
