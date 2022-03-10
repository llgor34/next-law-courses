import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (!firebase.apps.length) {
  // paste your data here
  const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  };
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

// initialize fireauth
export const projectAuth = firebase.auth();

// initialize firestore
export const projectFirestore = firebase.firestore();

// initialize firebase storage
export const projectStorage = firebase.storage().ref();

// Timestamp
export const Timestamp = firebase.firestore.Timestamp;

// firestore
export const Firestore = firebase.firestore;
