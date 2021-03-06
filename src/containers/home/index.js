import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import firestore from '../../firebase/firestore';

// components
import Link from 'components/link';
import ProgressBar from 'components/progress-bar';

// styles
import styles from './style.css';

const Home = () => {
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    // on mount
    firestore
      .getCollection('teams')
      .get()
      .then(snapshot => {
        const fetchedTeams = [];
        snapshot.forEach(x => fetchedTeams.push(x.data()));
        setTeams(fetchedTeams);
      });
  }, []);

  return (
    <>
      <Helmet title='Reactro' />
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
