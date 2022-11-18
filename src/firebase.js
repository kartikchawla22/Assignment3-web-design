// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE_CFNNVMK4i8PR_rROpXB2yIq4rHTKXE",
  authDomain: "webappassignment3-684c4.firebaseapp.com",
  projectId: "webappassignment3-684c4",
  storageBucket: "webappassignment3-684c4.appspot.com",
  messagingSenderId: "364794040490",
  appId: "1:364794040490:web:c7f7b4b2d3ddfd73abc0d3",
  measurementId: "G-V4C6KZFTT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth;

export { app, auth };