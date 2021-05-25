// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
// import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBPldRzsaGCQ1HGv2-PIimmqSVDhv9age4",
    authDomain: "bdd-app-96ce7.firebaseapp.com",
    projectId: "bdd-app-96ce7",
    storageBucket: "bdd-app-96ce7.appspot.com",
    messagingSenderId: "17162751595",
    appId: "1:17162751595:web:73170e5c3681f814b2eb2e",
    measurementId: "G-RSKBVPHV41"
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