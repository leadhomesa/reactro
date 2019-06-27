import React, { Fragment } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

// containers
import Home from 'containers/home';
import NotFound from 'containers/not-found';

// components
import Nav from 'components/nav';

import styles from './style.css';

const App = () => (
  <Fragment>
    <Nav />
    <div className={styles.container}>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Fragment>
);

export default App;
