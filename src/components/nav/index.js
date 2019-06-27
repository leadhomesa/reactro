import React from 'react';

// components
import logo from 'assets/logo.png';
import styles from './style.css';

const Nav = () => (
  <nav className={styles.nav}>
    <img src={logo} alt='logo' className={styles.logo} />
    <h2 className={styles.heading}>Retroact</h2>
  </nav>
);

export default Nav;
