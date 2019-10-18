import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import firestore from '../../firebase/firestore';

// components
import Section from 'components/section';
import SectionList from 'components/section-list';
import SimpleForm from 'components/simple-form';
import ProgressBar from 'components/progress-bar';
import CharacterSelection from 'components/character-selection';
import Separator from 'components/separator';

// styles
import styles from './style.css';

const Board = ({
  match: {
    params: { board: boardId, team }
  }
}) => {
  const [board, setBoard] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const firebaseUser = sessionStorage.getItem('firebaseUser');
    setUser(firebaseUser && JSON.parse(firebaseUser));

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

  const deleteFromBoard = (boardName, items, index, userId) => {
    const itemToDelete = items && items.length > index && items[index];
    if (itemToDelete && itemToDelete.uid === userId) {
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

  const updateUserIcon = (userId, character) => {
    firestore
      .getCollection('boards')
      .doc(boardId)
      .update({
        userIcons: { ...board.userIcons, [userId]: character }
      });
  };

  const title = (board && `${team}: ${board.name}`) || 'Loading';
  return (
    <>
      <Helmet title={title} />
      <div className={styles.board}>
        {!board && <ProgressBar />}
        {board && (
          <>
            <h2 className={styles.heading}>{title}</h2>
            <CharacterSelection
              selected={board.userIcons && board.userIcons[user.uid]}
              onSelect={characterName => {
                updateUserIcon(user.uid, characterName);
              }}
            />
            <Separator />
            <div className={styles.grid}>
              <SimpleForm
                useTextArea
                inputLabel='What`s good'
                onSubmit={({ value }) =>
                  addToBoard('good', board.good, { value, uid: user.uid })
                }
              />
              <SimpleForm
                useTextArea
                inputLabel='What`s bad'
                onSubmit={({ value }) =>
                  addToBoard('bad', board.bad, { value, uid: user.uid })
                }
              />
              <SimpleForm
                useTextArea
                inputLabel='Actionable?'
                onSubmit={({ value }) =>
                  addToBoard('action', board.action, { value, uid: user.uid })
                }
              />
            </div>
            <Separator />
            <div className={styles.grid}>
              <Section title='Good'>
                <SectionList
                  items={board.good}
                  userIcons={board.userIcons}
                  onDelete={i =>
                    deleteFromBoard('good', board.good, i, user.uid)
                  }
                />
              </Section>
              <Section title='Bad'>
                <SectionList
                  items={board.bad}
                  userIcons={board.userIcons}
                  onDelete={i => deleteFromBoard('bad', board.bad, i, user.uid)}
                />
              </Section>
              <Section title='Actionable'>
                <SectionList
                  items={board.action}
                  userIcons={board.userIcons}
                  onDelete={i =>
                    deleteFromBoard('action', board.action, i, user.uid)
                  }
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
