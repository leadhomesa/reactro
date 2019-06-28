import React, { Component } from 'react';
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

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: null
    };
    this.listener = null;
  }
  componentDidMount() {
    const { team } = this.props.match.params;
    const boardsRef = firestore.getCollection('boards');
    const query = boardsRef.where('team', '==', team);

    this.listener = query.onSnapshot(snapshot => {
      const fetchedBoards = [];
      snapshot.forEach(doc =>
        fetchedBoards.push({ id: doc.id, ...doc.data() })
      );
      this.setState({ boards: fetchedBoards });
    });
  }
  componentWillUnmount() {
    // unsubscribe
    this.listener();
  }
  render() {
    const { team } = this.props.match.params;
    const { boards } = this.state;
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
            <Section title='Boards'>
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
  }
}

Team.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ team: PropTypes.string.isRequired })
  })
};

export default Team;
