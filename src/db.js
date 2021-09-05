import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyD03v_nAWEGm77rw-wWAqfXvsX5wUupzMA',
  authDomain: 'firevuechat-8cdd4.firebaseapp.com',
  projectId: 'firevuechat-8cdd4',
  storageBucket: 'firevuechat-8cdd4.appspot.com',
  messagingSenderId: '408838909469',
  appId: '1:408838909469:web:eb3fe8b639eb9557fca0f4',
};

const db = firebase.initializeApp(config);
export default db;
