// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDHElizTaAv4g3aqBVXJoUWnTFuEYdQZI",
  authDomain: "learning-nestjs-6be40.firebaseapp.com",
  projectId: "learning-nestjs-6be40",
  storageBucket: "learning-nestjs-6be40.appspot.com",
  messagingSenderId: "985609859005",
  appId: "1:985609859005:web:8660b7ad1101bae370ecd4",
  measurementId: "G-1DFRRCTG71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getAuth(app);
