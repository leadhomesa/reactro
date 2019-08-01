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

const CharacterSelection = ({ selected }) => {
  return (
    <section className={styles.characters}>
      {characters.map((characterName, index) => (
        <i
          key={characterName}
          className={classnames(
            `nes-${characterName}`,
            styles.icon,
            selected === index && styles.active
          )}
        />
      ))}
    </section>
  );
};

CharacterSelection.propTypes = {
  selected: PropTypes.number.isRequired
};

export default CharacterSelection;
