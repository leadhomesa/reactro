import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './style.css';

const Section = ({ title, className, children }) => (
  <div className={classNames('nes-container', 'with-title', styles.container)}>
    <p className='title'>{title}</p>
    <div className={classNames(styles.children, className)}>{children}</div>
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Section;
