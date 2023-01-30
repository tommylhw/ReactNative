// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
import 'firebase/firestore';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, connectFirestoreEmulator  } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  databaseURL: 'https://projectmanagerapp-5d2c9.firebaseio.com',
  apiKey: "AIzaSyCM-yux0gBHhaETQkJjEm8BfGOonuLC4po",
  authDomain: "projectmanagerapp-5d2c9.firebaseapp.com",
  projectId: "projectmanagerapp-5d2c9",
  storageBucket: "projectmanagerapp-5d2c9.appspot.com",
  messagingSenderId: "944568779294",
  appId: "1:944568779294:web:7d545629e5c9f00f16640f",
  measurementId: "G-Z8DK8M17GF"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

// firebase.firestore().settings({ experimentalForceLongPolling: true });
// connectFirestoreEmulator(db, "10.0.2.2", 8080);
// const analytics = getAnalytics(app);

export { db, getFirestore, collection, addDoc };