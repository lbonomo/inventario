// import * as firebase from "firebase";
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";


// Estos datos se obtienen de la consola de Firebase
// en la configuracion del proyecto "Firebase SDK snippet"

const firebaseConfig = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
});



export default firebaseConfig;
