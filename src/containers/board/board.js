import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import firestore from '../../firestore';

// components
import Section from 'components/section';
import SectionList from 'components/section-list';
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

    return () => listener();
  }, []);

  const addToBoard = (boardName, items, newValue) => {
    const newItems = (items && [...items, newValue]) || [newValue];
    updateBoard(boardName, newItems);
  };

  const deleteFromBoard = (boardName, items, index) => {
    if (items && items.length > index) {
      items.splice(index, 1);
      updateBoard(boardName, items);
    }
  };

  const updateBoard = (boardName, items) => {
    firestore
      .getCollection('boards')
      .doc(boardId)
      .update({
        [boardName]: items
      });
  };

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
                onSubmit={({ value }) => addToBoard('good', board.good, value)}
              />
              <SimpleForm
                useTextArea
                inputLabel='What`s bad'
                onSubmit={({ value }) => addToBoard('bad', board.bad, value)}
              />
              <SimpleForm
                useTextArea
                inputLabel='Actionable?'
                onSubmit={({ value }) =>
                  addToBoard('action', board.action, value)
                }
              />
            </div>
            <hr className={styles.separator} />
            <div className={styles.grid}>
              <Section title='Good'>
                <SectionList
                  items={board.good}
                  onDelete={i => deleteFromBoard('good', board.good, i)}
                />
              </Section>
              <Section title='Bad'>
                <SectionList
                  items={board.bad}
                  onDelete={i => deleteFromBoard('bad', board.bad, i)}
                />
              </Section>
              <Section title='Actionable'>
                <SectionList
                  items={board.action}
                  onDelete={i => deleteFromBoard('action', board.action, i)}
                />
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
