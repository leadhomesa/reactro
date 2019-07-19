import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import firestore from '../../firestore';

// components
import Section from 'components/section';
import SimpleForm from 'components/simple-form';
import ProgressBar from 'components/progress-bar';

// styles
import styles from './style.css';

const Board = ({
  match: {
    params: { board: boardId }
  }
}) => {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardRef = firestore.getCollection('boards').doc(boardId);

    const listener = boardRef.onSnapshot(snapshot => {
      const newBoard = snapshot.data();
      setBoard(newBoard);
    });

    return () => {
      // dispose listener
      listener();
    };
  });

  const title = `Reactro - ${(board && board.name) || 'Loading'}`;

  return (
    <>
      <Helmet title={title} />
      <div className={styles.board}>
        {!board && <ProgressBar />}
        {board && (
          <>
            <h2 className={styles.heading}>{board.name}</h2>
            <div className={styles.grid}>
              <SimpleForm
                useTextArea
                inputLabel='What`s good'
                onSubmit={({ value }) => {
                  const good = board.good || [];
                  firestore
                    .getCollection('boards')
                    .doc(boardId)
                    .update({ good: [...good, value] });
                }}
              />
              <SimpleForm
                useTextArea
                inputLabel='What`s bad'
                onSubmit={({ value }) => {
                  const bad = board.bad || [];
                  firestore
                    .getCollection('boards')
                    .doc(boardId)
                    .update({ bad: [...bad, value] });
                }}
              />
              <SimpleForm
                useTextArea
                inputLabel='Actionable?'
                onSubmit={({ value }) => {
                  const action = board.action || [];
                  firestore
                    .getCollection('boards')
                    .doc(boardId)
                    .update({ action: [...action, value] });
                }}
              />
            </div>
            <hr className={styles.separator} />
            <div className={styles.grid}>
              <Section title='Good'>
                <ul className='nes-list is-disc'>
                  {board.good && board.good.map(x => <li key={x}>{x}</li>)}
                </ul>
              </Section>
              <Section title='Bad'>
                <ul className='nes-list is-disc'>
                  {board.bad && board.bad.map(x => <li key={x}>{x}</li>)}
                </ul>
              </Section>
              <Section title='Actionable'>
                <ul className='nes-list is-disc'>
                  {board.action && board.action.map(x => <li key={x}>{x}</li>)}
                </ul>
              </Section>
            </div>
          </>
        )}
      </div>
    </>
  );
};

Board.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      team: PropTypes.string.isRequired,
      board: PropTypes.string.isRequired
    })
  })
};

export default Board;
