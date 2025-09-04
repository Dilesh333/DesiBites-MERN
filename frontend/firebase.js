// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "desibites-d5d3b.firebaseapp.com",
  projectId: "desibites-d5d3b",
  storageBucket: "desibites-d5d3b.firebasestorage.app",
  messagingSenderId: "464432060628",
  appId: "1:464432060628:web:9757c7c277bbabef968341"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth, app}