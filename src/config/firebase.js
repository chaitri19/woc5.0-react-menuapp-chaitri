// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzkG_cWY5UEGmwTPqY4kscFnync3Xklio",
  authDomain: "menuapp-4df30.firebaseapp.com",
  projectId: "menuapp-4df30",
  storageBucket: "menuapp-4df30.appspot.com",
  messagingSenderId: "640817594713",
  appId: "1:640817594713:web:a6184b110b4c75338a0c48",
  measurementId: "G-SRQ7RS7KMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)