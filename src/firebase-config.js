import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCun162S1eXrrJcAIDjfaDl3ZScGz7_U3U",
  authDomain: "chatroom-96aaf.firebaseapp.com",
  projectId: "chatroom-96aaf",
  storageBucket: "chatroom-96aaf.firebasestorage.app",
  messagingSenderId: "829371141985",
  appId: "1:829371141985:web:da50d33a0813249854ff20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Initialize Cloud Firestore and export it
export const db = getFirestore(app);

// Initialize the Google Auth Provider and export it so the login button works
export const provider = new GoogleAuthProvider();
