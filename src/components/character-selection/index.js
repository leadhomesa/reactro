/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import Section from 'components/section';

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

const extraCharacters = [
  'hollow-knight',
  'link-not-zelda',
  'mugman',
  'pepe',
  'sanic',
  'spongebob',
  'vaultboy'
];

const CharacterSelection = ({ selected, onSelect }) => {
  return (
    <Section title='Select your character'>
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
      <section className={styles.characters}>
        {extraCharacters.map(name => (
          <img
            key={name}
            src={`/${name}.png`}
            alt={name}
            className={classnames(
              styles.character,
              selected === name && styles.active
            )}
            onClick={() => onSelect(name)}
          />
        ))}
      </section>
    </Section>
  );
};

CharacterSelection.propTypes = {
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CharacterSelection;
