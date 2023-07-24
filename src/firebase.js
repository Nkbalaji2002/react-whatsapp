// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLrnJPDJ0L5S7l2BT-mOHMWUSvov8vmn4",
  authDomain: "whatsapp-clone-e98b5.firebaseapp.com",
  projectId: "whatsapp-clone-e98b5",
  storageBucket: "whatsapp-clone-e98b5.appspot.com",
  messagingSenderId: "952303658614",
  appId: "1:952303658614:web:f54afca80fc538849be157",
  measurementId: "G-60GZ9M901M",
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const db = app.firestore()

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { db, auth, provider };
