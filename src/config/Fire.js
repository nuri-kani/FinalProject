import firebase from 'firebase';

const Config = {
    apiKey: "AIzaSyDMIGnQKHZijApAODCbN6f6RSoRRj1zsro",
    authDomain: "finalproject-6ef5b.firebaseapp.com",
    databaseURL: "https://finalproject-6ef5b.firebaseio.com",
    projectId: "finalproject-6ef5b",
    storageBucket: "finalproject-6ef5b.appspot.com",
    messagingSenderId: "167025231195",
    appId: "1:167025231195:web:e3863d23bbd21efe"
  };
const fire = firebase.initializeApp(Config);
export default fire;