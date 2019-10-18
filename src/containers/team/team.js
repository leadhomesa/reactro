import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';

import firestore from '../../firebase/firestore';

// components
import Section from 'components/section';
import CreateBoardForm from 'components/create-board';
import ProgressBar from 'components/progress-bar';
import Separator from 'components/separator';

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
      // create object with each quarter
      const fetchedBoards = {
        Q1: [],
        Q2: [],
        Q3: [],
        Q4: []
      };

      snapshot.forEach(doc => {
        const data = doc.data();

        // try to split the board name, might be created with old UI so need to cater for that
        const parts = data.name.split(' - ');
        const quarter = parts[0] || 'Q1';
        const name = parts[1] || data.name;

        fetchedBoards[quarter].push({ id: doc.id, ...data, name });
      });

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
            <CreateBoardForm
              inputLabel='Board name'
              onSubmit={boardName => {
                firestore
                  .getCollection('boards')
                  .add({ name: boardName, team });
              }}
            />
          </div>
        )}
        {boards && <Separator />}
        <div className={styles.boardsContainer}>
          {boards &&
            Object.keys(boards).map(quarter => (
              <Section
                key={`quarter-${quarter}`}
                title={quarter}
                className={styles.boards}
              >
                {boards[quarter].map(b => (
                  <Link
                    key={b.name}
                    className={classNames('nes-btn', styles.button)}
                    to={`/${team}/${b.id}`}
                  >
                    {b.name}
                  </Link>
                ))}
              </Section>
            ))}
        </div>
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
