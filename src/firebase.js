// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtfJLYt4RNJHwNsaapv7-oCgQdQfiANMk",
  authDomain: "crud-6e76b.firebaseapp.com",
  projectId: "crud-6e76b",
  storageBucket: "crud-6e76b.appspot.com",
  messagingSenderId: "501320518539",
  appId: "1:501320518539:web:181e216d2635e3a5f83d8e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export{firebase}