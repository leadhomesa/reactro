import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Link from 'react-router-dom/Link';
import classNames from 'classnames';

import firestore from '../../firestore';

// components
import ProgressBar from 'components/progress-bar';

// styles
import styles from './style.css';

const Home = () => {
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    firestore
      .getCollection('teams')
      .get()
      .then(snapshot => {
        const fetchedTeams = [];
        snapshot.forEach(x => fetchedTeams.push(x.data()));
        setTeams(fetchedTeams);
      });
  }, [teams]);

  return (
    <>
      <Helmet title='Reactro - Hello World!' />
      <div className={styles.home}>
        {!teams && <ProgressBar />}
        {teams && <h3>Select your team</h3>}
        {teams && (
          <div className={styles.teams}>
            {teams.map(x => (
              <Link
                key={x.name}
                className={classNames('nes-btn', styles.button)}
                to={`/${x.name}`}
              >
                {x.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
