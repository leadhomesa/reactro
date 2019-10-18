/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

const SectionList = ({ items, userIcons, onDelete }) => (
  <div className={classNames('nes-list', 'is-desc', styles.list)}>
    {items &&
      items.map((x, index) => {
        const character = (userIcons && userIcons[x.uid]) || 'bulbasaur';
        const isExternalCharacter = extraCharacters.includes(character);

        return (
          <div key={`item-${index}`} className={styles.item}>
            <div className={styles.text}>{(x && x.value) || x}</div>
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
                className={classNames(
                  `nes-${character}`,
                  'is-small',
                  styles.delete
                )}
                onClick={() => onDelete(index)}
              />
            )}
          </div>
        );
      })}
  </div>
);

SectionList.propTypes = {
  userIcons: PropTypes.array,
  items: PropTypes.array,
  onDelete: PropTypes.func
};

export default SectionList;
