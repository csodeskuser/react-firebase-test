import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBGu3XrZIvZTnkF_nBQd27j2CXDiB68heA",
    authDomain: "react-test-c818a.firebaseapp.com",
    projectId: "react-test-c818a",
    storageBucket: "react-test-c818a.appspot.com",
    messagingSenderId: "766380139123",
    appId: "1:766380139123:web:39e5de268a7b6e8e384006",
    measurementId: "G-B9P3N6HGSK"
  };

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();

export default db;