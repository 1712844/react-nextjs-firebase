import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAAwhenv5pxhzylz_Y83PaxoetDGZnK7Z8',
  authDomain: 'react-nextjs-firebase.firebaseapp.com',
  projectId: 'react-nextjs-firebase',
  storageBucket: 'react-nextjs-firebase.appspot.com',
  messagingSenderId: '772103624860',
  appId: '1:772103624860:web:ff9e66e2058e313efc7559',
  measurementId: 'G-JKH8X4VQCS',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

//firestore export
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
