// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtfLhx6SI9hVw-eu5w_R9GRK7bZLPJWnU",
  authDomain: "guests-edcf1.firebaseapp.com",
  projectId: "guests-edcf1",
  storageBucket: "guests-edcf1.appspot.com",
  messagingSenderId: "1032718692514",
  appId: "1:1032718692514:web:27f0cd40467af7d403a7fb",
  measurementId: "G-633977YZKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);