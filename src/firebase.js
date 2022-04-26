// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwl6aBmliEZfJoqboSOWNzuH6iCMArV2U",
  authDomain: "taller-react-1d73b.firebaseapp.com",
  projectId: "taller-react-1d73b",
  storageBucket: "taller-react-1d73b.appspot.com",
  messagingSenderId: "756734201919",
  appId: "1:756734201919:web:95a4551edefedd9474a88a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}