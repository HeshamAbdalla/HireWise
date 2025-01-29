// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwFcNsNrNbusNFKWwRwWRmCkaarY3fcxE",
  authDomain: "hirewise-462a8.firebaseapp.com",
  projectId: "hirewise-462a8",
  storageBucket: "hirewise-462a8.firebasestorage.app",
  messagingSenderId: "533803823940",
  appId: "1:533803823940:web:6aa0641f968b186ad35d11",
  measurementId: "G-7JYQC5V9PD"
};

// Initialize Firebase



const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();