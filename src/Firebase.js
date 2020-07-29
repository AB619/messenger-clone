import firebase from 'firebase';

const firebaseApp = firebase.initializeApp( {

    apiKey: "AIzaSyAZvi0gFAVm-UwUk1kzG8mR95c_C5UIcCU",
    authDomain: "react-messenger-39dd3.firebaseapp.com",
    databaseURL: "https://react-messenger-39dd3.firebaseio.com",
    projectId: "react-messenger-39dd3",
    storageBucket: "react-messenger-39dd3.appspot.com",
    messagingSenderId: "332367521299",
    appId: "1:332367521299:web:9b09bdd3c0fa25148d01e6",
    measurementId: "G-G9R4XPL5H0"

});

const db = firebase.firestore();

export default db;