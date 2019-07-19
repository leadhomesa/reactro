import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import config from './config';

class Firestore {
  constructor() {
    this.db = null;
  }
  init() {
    firebase.initializeApp(config);
    this.db = firebase.firestore();

    // anon sign in
    const auth = firebase.auth();
    auth.signInAnonymously().catch(error => console.log(error));
    auth.onAuthStateChanged(user =>
      sessionStorage.setItem('firebaseUser', JSON.stringify(user))
    );
  }
  getCollection(name) {
    return this.db.collection(name);
  }
}

const firestore = new Firestore();

export default firestore;
