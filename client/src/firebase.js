// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-luxury-estate.firebaseapp.com",
  projectId: "mern-luxury-estate",
  storageBucket: "mern-luxury-estate.appspot.com",
  messagingSenderId: "1080622119354",
  appId: "1:1080622119354:web:b070aac241a87834060583"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);