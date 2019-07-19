import * as firebase from 'firebase/app';
import 'firebase/auth';

export const signIn = new Promise((resolve, reject) => {
  firebase
    .auth()
    .signInAnonymously()
    .catch(error => {
      if (error) {
        reject(error);
      }
    });

  firebase.auth().onAuthStateChanged(user => resolve(user));
});
