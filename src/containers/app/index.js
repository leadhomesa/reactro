import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

// components
import Nav from 'components/nav';
import ProgressBar from 'components/progress-bar';

import styles from './style.css';

// lazy containers
const Home = lazy(() => import('containers/home'));
const Team = lazy(() => import('containers/team'));
const Board = lazy(() => import('containers/board'));
const NotFound = lazy(() => import('containers/not-found'));
const Health = lazy(() => import('containers/health'));

const App = () => (
  <>
    <Nav />
    <main className={styles.container}>
      <Suspense fallback={<ProgressBar />}>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/:team/:board' component={Board} exact />
          <Route path='/:team' component={Team} exact />
          <Route path='/health' component={Health} exact />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </main>
  </>
);

export default App;
