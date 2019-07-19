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

    return () => {
      // dispose listener
      listener();
    };
  });

  const deleteFromBoard = (boardName, items, index) => {
    if (items && items.length > index) {
      items.splice(index, 1);
      updateBoard(boardName, items);
    }
  };

  const updateBoard = (boardName, items) => {
    const updateRequest = {};
    updateRequest[boardName] = items;

    firestore
      .getCollection('boards')
      .doc(boardId)
      .update(updateRequest);
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
              <div>
                <Section title='Good'>
                  <SectionList
                    items={board.good}
                    onDelete={i => deleteFromBoard('good', board.good, i)}
                  />
                </Section>
                <SimpleForm
                  inputLabel='What`s good'
                  onSubmit={({ value }) => {
                    const good = board.good || [];
                    good.push(value);
                    updateBoard('good', good);
                  }}
                />
              </div>
              <div>
                <Section title='Bad'>
                  <SectionList
                    items={board.bad}
                    onDelete={i => deleteFromBoard('good', board.good, i)}
                  />
                </Section>
                <SimpleForm
                  inputLabel='What`s bad'
                  onSubmit={({ value }) => {
                    const bad = board.bad || [];
                    bad.push(value);
                    updateBoard('bad', bad);
                  }}
                />
              </div>
              <div>
                <Section title='Action'>
                  <SectionList
                    items={board.action}
                    onDelete={i => deleteFromBoard('good', board.good, i)}
                  />
                </Section>
                <SimpleForm
                  inputLabel='Actionable?'
                  onSubmit={({ value }) => {
                    const action = board.action || [];
                    action.push(value);
                    updateBoard('action', action);
                  }}
                />
              </div>
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
