import React, { useState, useEffect } from 'react';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';

import firestore from '../../firestore';

// components
import Section from 'components/section';
import SimpleForm from 'components/simple-form';
import ProgressBar from 'components/progress-bar';

// styles
import styles from './style.css';

const Team = ({
  match: {
    params: { team }
  }
}) => {
  const [boards, setBoards] = useState(null);

  useEffect(() => {
    // on mount
    const boardsRef = firestore.getCollection('boards');
    const query = boardsRef.where('team', '==', team);

    const listener = query.onSnapshot(snapshot => {
      const fetchedBoards = [];
      snapshot.forEach(doc =>
        fetchedBoards.push({ id: doc.id, ...doc.data() })
      );
      setBoards(fetchedBoards);
    });

    return () => listener();
  }, []);

  return (
    <>
      <Helmet title={`Reactro - ${team}`} />
      <div className={styles.team}>
        {!boards && <ProgressBar />}
        {boards && <h2 className={styles.heading}>{team}</h2>}
        {boards && (
          <div className={styles.add}>
            <SimpleForm
              inputLabel='Board name'
              onSubmit={({ value }) => {
                firestore.getCollection('boards').add({ name: value, team });
              }}
            />
          </div>
        )}
        {boards && (
          <Section title='Boards' className={styles.boards}>
            {boards.map(x => (
              <Link
                key={x.name}
                className={classNames('nes-btn', styles.button)}
                to={`/${team}/${x.id}`}
              >
                {x.name}
              </Link>
            ))}
          </Section>
        )}
      </div>
    </>
  );
};

Team.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ team: PropTypes.string.isRequired })
  })
};

export default Team;
