import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDwDs8XkDdhPjQ-67k-zDuvnpd82_BDIp8',
  authDomain: 'leadhome-reactro.firebaseapp.com',
  databaseURL: 'https://leadhome-reactro.firebaseio.com',
  projectId: 'leadhome-reactro',
  storageBucket: 'leadhome-reactro.appspot.com',
  messagingSenderId: '449876336912',
  appId: '1:449876336912:web:d0598cf8f100da8f'
};

class Firestore {
  constructor() {
    this.db = null;
  }
  init() {
    firebase.initializeApp(config);
    this.db = firebase.firestore();
  }
  getCollection(name) {
    return this.db.collection(name);
  }
}

const firestore = new Firestore();

export default firestore;
