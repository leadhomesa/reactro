import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

const Section = ({ title, children }) => (
  <div className={classNames('nes-container', 'with-title', styles.container)}>
    <p className='title'>{title}</p>
    <div className={styles.children}>{children}</div>
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Section;
