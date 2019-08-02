import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './style.css';

const characters = [
  'mario',
  'ash',
  'pokeball',
  'bulbasaur',
  'charmander',
  'squirtle',
  'kirby'
];

const CharacterSelection = ({ selected, onSelect }) => {
  return (
    <section className={styles.characters}>
      {characters.map(characterName => (
        <i
          key={characterName}
          className={classnames(
            `nes-${characterName}`,
            styles.icon,
            (selected || 'bulbasaur') === characterName && styles.active
          )}
          onClick={() => onSelect(characterName)}
        />
      ))}
    </section>
  );
};

CharacterSelection.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CharacterSelection;
