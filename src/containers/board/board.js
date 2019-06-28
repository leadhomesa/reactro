import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import firestore from '../../firestore';

// components
import Section from 'components/section';
import SimpleForm from 'components/simple-form';
import ProgressBar from 'components/progress-bar';

// styles
import styles from './style.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: null
    };
    this.listener = null;
  }
  componentDidMount() {
    const { board } = this.props.match.params;
    console.log('what is board', board);
    const boardRef = firestore.getCollection('boards').doc(board);

    this.listener = boardRef.onSnapshot(snapshot => {
      const newBoard = snapshot.data();
      this.setState({ board: newBoard });
    });
  }
  componentWillUnmount() {
    // unsubscribe
    this.listener();
  }
  render() {
    const { board } = this.state;
    const boardId = this.props.match.params.board;
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
                    <ul className='nes-list is-disc'>
                      {board.good && board.good.map(x => <li key={x}>{x}</li>)}
                    </ul>
                  </Section>
                  <SimpleForm
                    inputLabel='What`s good'
                    onSubmit={({ value }) => {
                      firestore
                        .getCollection('boards')
                        .doc(boardId)
                        .update({ good: [...board.good, value] });
                    }}
                  />
                </div>
                <div>
                  <Section title='Bad'>
                    <ul className='nes-list is-disc'>
                      {board.bad && board.bad.map(x => <li key={x}>{x}</li>)}
                    </ul>
                  </Section>
                  <SimpleForm
                    inputLabel='What`s bad'
                    onSubmit={({ value }) => {
                      firestore
                        .getCollection('boards')
                        .doc(boardId)
                        .update({ bad: [...board.bad, value] });
                    }}
                  />
                </div>
                <div>
                  <Section title='Action'>
                    <ul className='nes-list is-disc'>
                      {board.action &&
                        board.action.map(x => <li key={x}>{x}</li>)}
                    </ul>
                  </Section>
                  <SimpleForm
                    inputLabel='Actionable?'
                    onSubmit={({ value }) => {
                      firestore
                        .getCollection('boards')
                        .doc(boardId)
                        .update({ action: [...board.action, value] });
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

Board.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      team: PropTypes.string.isRequired,
      board: PropTypes.string.isRequired
    })
  })
};

export default Board;
