// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
// import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAIOaWoJvaxq2WHme0cEbJt6Z_7FbSAxEc",
    authDomain: "rambo-app-5629e.firebaseapp.com",
    projectId: "rambo-app-5629e",
    storageBucket: "rambo-app-5629e.appspot.com",
    messagingSenderId: "920782818306",
    appId: "1:920782818306:web:11b55a98d63b8989202b1b",
    measurementId: "G-S3S87XTZ1L"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Enable Data Persistence
firebase.firestore().enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.log("Multiple tabs open, persistence can only be enabled in one tab at a a time.");
        } else if (err.code == 'unimplemented') {
            console.log("The current browser does not support all of the features required to enable persistence.");
        }
    });
// Subsequent queries will use persistence, if it was enabled successfully


// Init Firestore
const db = firebase.firestore();

export { firebase, db };