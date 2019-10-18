import React from 'react';
import { Link } from 'react-router-dom';

// components
import logo from 'assets/logo.png';
import styles from './style.css';

const Nav = () => (
  <nav className={styles.nav}>
    <Link to='/'>
      <img src={logo} alt='logo' className={styles.logo} />
    </Link>
    <h2 className={styles.heading}>Reactro</h2>
    <a
      href='http://github.com/leadhomesa/reactro'
      className={styles.githubLink}
    >
      <i className='nes-icon github' />
    </a>
  </nav>
);

export default Nav;
