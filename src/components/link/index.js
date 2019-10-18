import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link as ReactRouterLink } from 'react-router-dom';

// styles
import styles from './style.css';

const Link = ({ className, children, ...rest }) => (
  <ReactRouterLink className={classnames(className, styles.link)} {...rest}>
    {children}
  </ReactRouterLink>
);

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Link;
