import React, { Fragment } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

// containers
import Home from 'containers/home';
import Team from 'containers/team';
import Board from 'containers/board';
import NotFound from 'containers/not-found';
import Health from 'containers/health';

// components
import Nav from 'components/nav';

import styles from './style.css';

const App = () => (
  <Fragment>
    <Nav />
    <div className={styles.container}>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/:team/:board' component={Board} exact />
        <Route path='/:team' component={Team} exact />
        <Route path='/health' component={Health} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Fragment>
);

export default App;
