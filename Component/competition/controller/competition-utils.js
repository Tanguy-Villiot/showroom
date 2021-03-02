import firebase from "firebase";

const config = {

    apiKey: process.env.API_KEY_FIREBASE,
    authDomain: "ankward-firebase.firebaseapp.com",
    databaseURL: "https://ankward-firebase.firebaseio.com",
    projectId: "ankward-firebase",
    storageBucket: "ankward-firebase.appspot.com",
    messagingSenderId: "905408863602",
    appId: "1:905408863602:web:f9446dfd32d91b1a0e11eb",
    measurementId: "G-RMHB6DWSZ2"

}

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}else {
    firebase.app(); // if already initialized, use that one
}

export default firebase