import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import firestore from '../../firebase/firestore';

// components
import Section from 'components/section';
import SectionList from 'components/section-list';
import ProgressBar from 'components/progress-bar';
import CharacterSelection from 'components/character-selection';
import Separator from 'components/separator';
import InputSection from './input-section';

// helpers
import { deleteFromBoard, updateUserIcon, addLikeToBoard } from './helpers';

// styles
import styles from './style.css';

const Board = () => {
  const { board: boardId, team } = useParams();
  const [board, setBoard] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // get firebase session
    const firebaseUser = sessionStorage.getItem('firebaseUser');
    setUser(firebaseUser && JSON.parse(firebaseUser));

    const boardRef = firestore.getCollection('boards').doc(boardId);

    // subscribe to board changes
    const listener = boardRef.onSnapshot(snapshot => {
      // get board snapshot
      const newBoard = snapshot.data();
      setBoard(newBoard);
    });

    return () => listener();
  }, []);

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
                updateUserIcon({
                  userId: user.uid,
                  selectedCharacter: characterName,
                  boardId,
                  userIcons: board.userIcons
                });
              }}
            />
            <Separator />
            <InputSection
              boardId={boardId}
              goodItems={board.good}
              badItems={board.bad}
              actionItems={board.action}
              userId={user.uid}
            />
            <Separator />
            <div className={styles.grid}>
              <Section title='Good'>
                <SectionList
                  userId={user.uid}
                  items={board.good}
                  userIcons={board.userIcons}
                  onDelete={i =>
                    deleteFromBoard({
                      id: boardId,
                      type: 'good',
                      items: board.good,
                      userId: user.uid,
                      indexToDelete: i
                    })
                  }
                  onLike={i =>
                    addLikeToBoard({
                      id: boardId,
                      type: 'good',
                      items: board.good,
                      userId: user.uid,
                      indexToLike: i
                    })
                  }
                />
              </Section>
              <Section title='Bad'>
                <SectionList
                  items={board.bad}
                  userIcons={board.userIcons}
                  onDelete={i =>
                    deleteFromBoard({
                      id: boardId,
                      type: 'bad',
                      items: board.bad,
                      userId: user.uid,
                      indexToDelete: i
                    })
                  }
                  onLike={i =>
                    addLikeToBoard({
                      id: boardId,
                      type: 'bad',
                      items: board.bad,
                      userId: user.uid,
                      indexToLike: i
                    })
                  }
                />
              </Section>
              <Section title='Actionable'>
                <SectionList
                  items={board.action}
                  userIcons={board.userIcons}
                  onDelete={i =>
                    deleteFromBoard({
                      id: boardId,
                      type: 'action',
                      items: board.action,
                      userId: user.uid,
                      indexToDelete: i
                    })
                  }
                  onLike={i =>
                    addLikeToBoard({
                      id: boardId,
                      type: 'action',
                      items: board.action,
                      userId: user.uid,
                      indexToLike: i
                    })
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

export default Board;
