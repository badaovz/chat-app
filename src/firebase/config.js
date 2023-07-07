// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { collection, getDocs, getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyAwRBdRL56NqY0yXlaLR6R0cJLUIhNB2Bo",
  authDomain: "chat-app-7f0f7.firebaseapp.com",
  projectId: "chat-app-7f0f7",
  storageBucket: "chat-app-7f0f7.appspot.com",
  messagingSenderId: "377519631679",
  appId: "1:377519631679:web:a211df84eac20aa1faf78a",
  measurementId: "G-MPBTFD62TW"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const analytics = getAnalytics(app);

// use firebase emulators

// connectAuthEmulator(auth, 'http://localhost:9099');
// if(window.location.hostname === 'localhost') {
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export { db, auth, app, analytics };

