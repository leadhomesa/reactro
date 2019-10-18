import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

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
    <main className={styles.container}>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/:team/:board' component={Board} exact />
        <Route path='/:team' component={Team} exact />
        <Route path='/health' component={Health} exact />
        <Route component={NotFound} />
      </Switch>
    </main>
  </Fragment>
);

export default App;
